import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isNumber } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { clearZipcode } from 'src/utils/format';
import { PaginationResponse, PAGINATION_DEFAULT_LIMIT } from 'src/utils/pagination';
import { AddressResponse } from './models/AddressResponse';

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) { }
    async getAddressByZipcode(zipcode: string) {
        zipcode = clearZipcode(zipcode);
        const addressInst = await this.prisma.addresses.findUnique({ where: { zipcode } });

        if (!addressInst) {
            throw new NotFoundException();
        }

        const geolocationInst = await this.prisma.geolocations.findUnique(
            {
                where: { zipcode: addressInst.zipcode }
            }
        );

        const neighborhoodInst = await this.prisma.neighborhoods.findUnique(
            {
                where: { id: addressInst.neighborhood_id }
            }
        );

        const cityInst = await this.prisma.cities.findUnique(
            {
                where: { id: addressInst.city_id }
            }
        );

        const stateInst = cityInst
            ? await this.prisma.states.findUnique({ where: { uf: cityInst.uf } })
            : null;

        return new AddressResponse(addressInst, geolocationInst, neighborhoodInst, cityInst, stateInst);
    }

    async getAddressesByNeighborhood(
        uf: string,
        city: string,
        neighborhood: string,
        page: number = 1
    ) {
        page = isNumber(page) ? page : 1;

        if (page < 1) {
            throw new BadRequestException('page must be greater than 0.');
        }

        const limit = PAGINATION_DEFAULT_LIMIT;
        const offset = (page - 1) * limit;

        const stateInst = await this.prisma.states.findUnique({ where: { uf } });

        if (!stateInst) {
            throw new BadRequestException('invalid UF.');
        }

        const cityInst = await this.prisma.cities.findFirst({ where: { city, uf } });

        if (!cityInst) {
            throw new BadRequestException('invalid city name.');
        }

        var neighborhoodInst = null;

        if (neighborhood) {
            neighborhoodInst = await this.prisma.neighborhoods.findFirst({
                where: {
                    city_id: cityInst.id,
                    neighborhood
                }
            });
        }

        if (neighborhood && !neighborhoodInst) {
            throw new BadRequestException('invalid neighborhood name.');
        }

        var neighborhoodWhere = {};

        if (neighborhoodInst) {
            neighborhoodWhere = { neighborhood_id: neighborhoodInst.id };
        }

        const total = await this.prisma.addresses.count({
            where: {
                city_id: cityInst.id,
                ...neighborhoodWhere
            }
        });

        const addresses = await this.prisma.addresses.findMany({
            where: {
                city_id: cityInst.id,
                ...neighborhoodWhere
            },
            orderBy: [{ street: 'asc' }],
            skip: offset,
            take: limit
        });

        const data = await Promise.all(addresses.map(async (address) => {
            const geolocationInst = await this.prisma.geolocations.findUnique(
                {
                    where: { zipcode: address.zipcode }
                }
            );

            if (!neighborhoodInst) {
                neighborhoodInst = await this.prisma.neighborhoods.findUnique(
                    {
                        where: { id: address.neighborhood_id }
                    }
                );
            }

            return new AddressResponse(
                address,
                geolocationInst,
                neighborhoodInst,
                cityInst,
                stateInst
            );
        }));

        return new PaginationResponse(total, page, limit, data);
    }
}
