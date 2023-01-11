import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class AddressesByNeighborhoodParams {
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    uf: string;

    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    neighborhood?: string;
}