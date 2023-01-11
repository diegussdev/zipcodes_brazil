import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isNumber } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationResponse, PAGINATION_DEFAULT_LIMIT } from 'src/utils/pagination';
import { Neighborhood } from './models/Neighborhood';
import { NeighborhoodRangeResponse } from './models/NeighborhoodRangeResponse';

@Injectable()
export class NeighborhoodService {
    constructor(private readonly prisma: PrismaService) { }

    async getNeighborhoodByCity(uf: string, city: string, page: number = 1) {
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

        const total = await this.prisma.cities.count({ where: { city } });

        const neighborhoods = await this.prisma.neighborhoods.findMany({
            where: { city_id: cityInst.id },
            orderBy: [{ neighborhood: 'asc' }],
            skip: offset,
            take: limit
        });

        const data = neighborhoods.map((neighborhood) => {
            return new Neighborhood(neighborhood, cityInst, stateInst);
        });

        return new PaginationResponse(total, page, limit, data);
    }

    async getZipcodeNeighborhoodRange(uf: string, city: string, neighborhood: string) {
        const stateInst = await this.prisma.states.findFirst({ where: { uf } });

        if (!stateInst) {
            throw new NotFoundException('invalid UF.');
        }

        const cityInst = await this.prisma.cities.findFirst({ where: { city, uf } });

        if (!cityInst) {
            throw new NotFoundException('invalid city name');
        }

        const neighborhoodInst = await this.prisma.neighborhoods.findFirst({
            where: {
                city_id: cityInst.id,
                neighborhood
            }
        });

        if (!neighborhoodInst) {
            throw new NotFoundException('invalid neighborhood name');
        }

        const neighborhoodRange = await this.prisma.neighborhood_ranges.findFirst({
            where: { neighborhood_id: neighborhoodInst.id }
        });

        if (!neighborhoodRange) {
            throw new NotFoundException('neighborhood zipcode range not found.');
        }

        return new NeighborhoodRangeResponse(neighborhoodInst, cityInst, stateInst, neighborhoodRange);
    }
}
