import { Matches } from "class-validator";

export class ZipcodeParams {
    @Matches(/(^[0-9]{5})-?([0-9]{3}$)/, { message: 'invalid zipcode format.' })
    zipcode: string;
}