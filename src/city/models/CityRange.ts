import { city_ranges } from "@prisma/client";

export class CityRange {
    min: string;
    max: string;

    constructor(
        cityRange: city_ranges
    ) {
        this.min = cityRange.min;
        this.max = cityRange.max;
    }
}