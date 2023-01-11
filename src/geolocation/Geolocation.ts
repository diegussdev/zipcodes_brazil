import { geolocations } from "@prisma/client";

export class Geolocation {
    latitude: string;
    longitude: string;

    constructor(
        geolocation: geolocations
    ) {
        this.latitude = geolocation.latitude;
        this.longitude = geolocation.longitude;
    }
}