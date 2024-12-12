import { OrderStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";

export class CreateOrderDto {
    @IsNumber()
    @Type(() => Number)
    @IsPositive()
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
    paidAt?: Date;
}
