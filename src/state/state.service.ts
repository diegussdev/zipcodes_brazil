import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationResponse } from 'src/utils/pagination';
import { State } from './models/State';

@Injectable()
export class StateService {
    constructor(private readonly prisma: PrismaService) { }

    async getStates() {
        const states = await this.prisma.states.findMany({ orderBy: { uf: 'asc' } });
        const total = states.length;
        return new PaginationResponse(total, 1, total, states);
    }

    async getStateByUf(uf: string) {
        const stateInst = await this.prisma.states.findUnique({ where: { uf } });

        if (!stateInst) {
            throw new BadRequestException(`state with UF '${uf}' not found.`);
        }

        return new State(stateInst);
    }
}
