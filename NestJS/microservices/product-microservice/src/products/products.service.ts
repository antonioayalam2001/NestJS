import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {


  private readonly logger = new Logger("ProductsService");

  async onModuleInit() {
    await this.$connect()
    this.logger.log("Connected to the database")
  }

  async create(createProductDto: CreateProductDto) {

    const productExists = await this.product.findFirst({
      where: {
        name: createProductDto.name
      }
    })

    if (productExists) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: "Product already exists"
      })
    }

    try {
      const product = await this.product.create({
        data: createProductDto
      })
      return product
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      })
    }
  }

  async findAll(pagination: PaginationDTO) {
    const { limit, page } = pagination

    const totalItems = await this.product.count()
    const totalPages = Math.ceil(totalItems / limit)

    if (page > totalPages) {
      return {
        products: [],
        totalPages,
      }
    }

    const products = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })


    return {
      products,
      meta: {
        totalItems,
        itemsPerPage: limit,
        currentPage: page,
        totalPages
      },
    }
  }

  async findOne(id: number) {

    const product = await this.product.findUniqueOrThrow({
      where: {
        id, AND: { available: true }
      }
    }).catch((error) => {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      })
    })
    return product
  }
  async update(id: number, updateProductDto: UpdateProductDto) {

    const product = await this.findOne(id)

    const { id: _, ...data } = updateProductDto

    const updatedProduct = await this.product.update({
      data,
      where: {
        id
      },
      select: {
        name: true,
        price: true,
        id: true
      }
    })

    return updatedProduct
  }

  async remove(id: number) {
    await this.findOne(id)
    const product = await this.product.update({
      where: {
        id
      },
      data: {
        available: false
      }
    })
    return product
  }
}
