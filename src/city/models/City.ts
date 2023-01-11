import { cities, city_ranges, states } from "@prisma/client";
import { State } from "src/state/models/State";
import { CityRange } from "./CityRange";

export class City {
    name: string;
    ibge_code: string;
    state?: State;

    constructor(
        city: cities,
        state?: states
    ) {
        this.name = city.city;
        this.ibge_code = city.ibge_code;

        if (state) {
            this.state = new State(state);
        }
    }
}