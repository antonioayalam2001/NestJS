import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class PaginationDTO {

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number = 1

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number = 10
}