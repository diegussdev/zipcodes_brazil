import { IsString, MaxLength, MinLength } from "class-validator";

export class ZipcodeNeighborhoodParams {
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    uf: string;

    @IsString()
    city: string;

    @IsString()
    neighborhood: string;
}