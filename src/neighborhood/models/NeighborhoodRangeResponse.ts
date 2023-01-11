import { cities, city_ranges, neighborhoods, neighborhood_ranges, states } from "@prisma/client";
import { City } from "src/city/models/City";
import { NeighborhoodRange } from "./NeighborhoodRange";

export class NeighborhoodRangeResponse {
    name: string;
    city?: City;
    zipcode_range?: NeighborhoodRange

    constructor(
        neighborhood: neighborhoods,
        city: cities,
        state: states,
        neighborhoodRange?: neighborhood_ranges
    ) {
        this.name = neighborhood.neighborhood;
        this.city = new City(city, state);
        this.zipcode_range = new NeighborhoodRange(neighborhoodRange);
    }
}