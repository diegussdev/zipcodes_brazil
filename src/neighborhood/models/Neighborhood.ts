import { cities, neighborhoods, neighborhood_ranges, states } from "@prisma/client";
import { City } from "src/city/models/City";
import { NeighborhoodRange } from "src/neighborhood/models/NeighborhoodRange";

export class Neighborhood {
    name: string;
    city?: City;

    constructor(
        neighborhood: neighborhoods,
        city?: cities,
        state?: states
    ) {
        this.name = neighborhood.neighborhood;

        if (city) {
            this.city = new City(city, state);
        }
    }
}

