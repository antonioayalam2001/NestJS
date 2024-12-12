import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { OrdersPaginationDTO } from 'src/common/dto/pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger("OrdersService");

  async onModuleInit() {
    await this.$connect()
    this.logger.log("Connected to the database")
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto
    })
  }

  async findAll(pagination: OrdersPaginationDTO) {
    const { page, limit, status } = pagination
    const totalItems = await this.order.count({
      where: {
        status: status
      }
    })

    const totalPages = Math.ceil(totalItems / limit)


    const allOrders = await this.order.findMany({
      where: {
        status: status
      },
      skip: (page - 1) * limit,
      take: limit
    })
    return {
      orders: allOrders,
      totalPages,
      totalItems,
      page,
    }
  }

  async findOne(id: string) {
    const order = await this.order.findUnique({
      where: {
        id: id
      }
    })

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: "Order not found"
      })
    }

    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {

    await this.findOne(id)

    delete updateOrderDto.id

    return this.order.update({
      where: {
        id: id
      },
      data: updateOrderDto
    })
  }

  async remove(id: string) {
    const order = await this.findOne(id)

    if (order.status === "CANCELLED") {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: "Order is already cancelled"
      })
    }

    return this.order.update({
      where: {
        id: id
      },
      data: {
        status: "CANCELLED"
      }
    })

  }

  async changeOrderStatus(changeStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeStatusDto

    const order = await this.findOne(id)

    if (order.status === status) {
      return order
    }


    return this.order.update({
      where: {
        id: id
      },
      data: {
        status: status
      }
    })
  }
}
