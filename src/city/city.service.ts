import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isNumber } from 'class-validator';
import { skip } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationResponse, PAGINATION_DEFAULT_LIMIT } from 'src/utils/pagination';
import { City } from './models/City';
import { CityRangeResponse } from './models/CityRangeResponse';

@Injectable()
export class CityService {
    constructor(private readonly prisma: PrismaService) { }

    async getCityByUf(uf: string, page: number = 1) {
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

        const total = await this.prisma.cities.count({ where: { uf } });

        const cities = await this.prisma.cities.findMany({
            where: { uf },
            orderBy: [{ city: 'asc' }],
            skip: offset,
            take: limit
        });

        const data = cities.map((city) => {
            return new City(city, stateInst);
        });

        return new PaginationResponse(total, page, limit, data);
    }

    async getZipcodeCityRange(uf: string, city: string) {

        const stateInst = await this.prisma.states.findFirst({ where: { uf } });

        if (!stateInst) {
            throw new NotFoundException('invalid UF.');
        }

        const cityInst = await this.prisma.cities.findFirst({ where: { city, uf } });

        if (!cityInst) {
            throw new NotFoundException('invalid city name');
        }

        const cityRange = await this.prisma.city_ranges.findFirst({ where: { city_id: cityInst.id } });

        if (!cityRange) {
            throw new NotFoundException('city zipcode range not found.');
        }

        return new CityRangeResponse(cityInst, stateInst, cityRange);
    }
}
