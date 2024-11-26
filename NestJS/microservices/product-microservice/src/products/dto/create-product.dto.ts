import { Type } from "class-transformer"
import { IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {

    @IsString()
    public name: string

    @IsNumber({
        maxDecimalPlaces: 2
    })
    @Type(() => Number)
    @Min(0)
    public price: number
}
