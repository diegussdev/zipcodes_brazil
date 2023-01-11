import { states } from "@prisma/client";

export class State {
    uf: string;
    name: string;
    ibge_code: string;

    constructor(
        state: states
    ) {
        this.uf = state.uf;
        this.name = state.state;
        this.ibge_code = state.ibge_code;
    }
}