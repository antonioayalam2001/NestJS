import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { Users } from 'src/auth/entities/users.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth() 
  uploadFile(@Body() createProductDto: CreateProductDto,
  @GetUser() user: Users) {
    return this.productsService.create(createProductDto,user);
  }

  @Auth() 
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: Users
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationQuery: PaginationDTO,
    @Req() req: Express.Request) {
    console.log(req.user);
    console.log("GG");
    
    return this.productsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOnePlain(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: Users
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.productsService.removeAll();
  }
}
