import { IsInt, IsNumber, IsString, isString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    
    @IsNumber()
    @Min(1)
    @IsInt()
    no: number
    @IsString()
    @MinLength(1)
    name: string
}
