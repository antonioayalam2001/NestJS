import { OrderStatus } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";

export class ChangeOrderStatusDto {
    @IsString()
    @IsUUID(4)
    id:string

    @IsEnum(OrderStatusList, {
        message: `Status must be one of the following: ${OrderStatusList}`
    })
    status: OrderStatus;
}