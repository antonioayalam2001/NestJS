import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrdersPaginationDTO, PaginationDTO, StatusDto } from 'src/common/dto/pagination.dto';
import { ORDERS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send("createOrder", createOrderDto)
  }

  @Get()
  findAll(
    @Query() pagination: OrdersPaginationDTO
  ) {
    return this.ordersClient.send('findAllOrders', pagination)
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send("findOneOrder", id)
      .pipe(catchError(error => {
        throw new RpcException(error)
      }))
  }

  @Get(":status")
  findAllByStatus(
    @Query() pagination: PaginationDTO,
    @Param() statusDTO: StatusDto
  ) {
    return this.ordersClient.send('findAllOrders', {
      ...pagination,
      status: statusDTO.status
    })
    .pipe(catchError(error => {
      throw new RpcException(error)
    }))
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.send("updateOrder", {
      id,
      ...updateOrderDto
    })
      .pipe(catchError(error => {
        throw new RpcException(error)
      }))
  }


  @Delete(':id')
  changeOrderStatus(@Param("id", ParseUUIDPipe) id: string) {
    return this.ordersClient.send("removeOrder", id)
      .pipe(catchError(error => {
        throw new RpcException(error)
      }))
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDTO: StatusDto
  ) {
    return this.ordersClient.send("changeOrderStatus", {
      id, status: statusDTO.status
    })
    .pipe(catchError(error => {
      throw new RpcException(error)
    }))
  }


}
