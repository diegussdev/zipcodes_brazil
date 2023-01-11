import { cities, city_ranges, states } from "@prisma/client";
import { State } from "src/state/models/State";
import { CityRange } from "./CityRange";

export class CityRangeResponse {
    name: string;
    ibge_code: string;
    state: State;
    zipcode_range: CityRange

    constructor(
        city: cities,
        state: states,
        cityRange: city_ranges
    ) {
        this.name = city.city;
        this.ibge_code = city.ibge_code;
        this.state = new State(state);
        this.zipcode_range = new CityRange(cityRange);

    }
}