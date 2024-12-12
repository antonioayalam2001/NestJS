import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "@prisma/client";

export class CreateOrderDto {
    @IsNumber()
    @Type(() => Number)
    totalAmount: number;

    @IsNumber()
    @Type(() => Number)
    totalItems: number;

    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${OrderStatusList}`
    })
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid?: boolean;

    @IsBoolean()
    @IsOptional()
    paidAt?: Date;

}
