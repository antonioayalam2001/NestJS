import { IsBoolean, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class PokemonQueryDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit: number;
    @IsOptional()
    @Min(0)
    offset: number;
    @IsOptional()
    @IsBoolean()
    sorted: boolean
}