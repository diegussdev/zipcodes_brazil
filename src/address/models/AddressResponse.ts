import { addresses, cities, geolocations, neighborhoods, states } from "@prisma/client";
import { City } from "src/city/models/City";
import { Geolocation } from "src/geolocation/Geolocation";
import { State } from "src/state/models/State";
import { formatZipcode } from "src/utils/format";

export class AddressResponse {
    zipcode: string;
    street: string;
    complement: string;
    neighborhood: string | null;
    locality: string;
    city: City | null;
    state: State | null;
    geolocation: Geolocation | null;

    constructor(
        address: addresses,
        geolocation?: geolocations,
        neighborhood?: neighborhoods,
        city?: cities | null,
        state?: states | null
    ) {
        this.zipcode = formatZipcode(address.zipcode);
        this.street = `${address.street_type} ${address.street}`.trim();
        this.complement = address.complement;
        this.neighborhood = neighborhood ? neighborhood.neighborhood : null;
        this.locality = address.locality ? address.locality : city?.city;
        this.geolocation = geolocation ? new Geolocation(geolocation) : null;
        this.city = city ? new City(city, state) : null;
    }
}