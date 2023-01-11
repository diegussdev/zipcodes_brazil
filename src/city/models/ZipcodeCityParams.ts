import { IsString, MaxLength, MinLength } from "class-validator";

export class ZipcodeCityParams {
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    uf: string;

    @IsString()
    city: string;
}