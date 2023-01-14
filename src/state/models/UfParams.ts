import { IsString, MaxLength, MinLength } from "class-validator";

export class UfParams {
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    uf: string;
}