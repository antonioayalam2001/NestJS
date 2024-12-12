import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import { OrderStatus, OrderStatusList } from "src/orders/enum/order.enum";

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

export class OrdersPaginationDTO extends PaginationDTO {
    @IsString()
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${OrderStatusList}`
    })
    status?: OrderStatus
}

export class StatusDto {
    @IsString()
    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${OrderStatusList}`
    })
    status: OrderStatus 
}