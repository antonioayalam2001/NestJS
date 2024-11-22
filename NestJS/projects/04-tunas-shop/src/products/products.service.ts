import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities';
import { Product } from './entities/product.entity';
import { Users } from 'src/auth/entities/users.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsServiceLogger')
  private readonly errorStatusCodes = ['23505', '23502']


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly imageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource
  ) { }

  async create(createProductDto: CreateProductDto, user : Users) {
    try {
      const { images = [], ...productDetails } = createProductDto

      //Crea la instancia del producto, un objeto que puede ser guardado en la BD
      const product = this.productRepository.create({
        ...productDetails,
        user: user,
        // Aqui TypeORM ya infiera en automatico el ID de producto que se va a colocar en la tabla
        // images, es por eso que no se define manual.
        //En la tabla productos tampoco hay un campo de imagenes, pero como se tiene una relacion
        //con la tabla de imagenes, se puede acceder a las imagenes de un producto a traves de la tabla de imagenes. En images se pueden guardar la cantidad de imagenes que sea con el ID de producto y mediante un join se pueden obtener las imagenes de un producto.
        images: images.map(image => this.imageRepository.create({ url: image }))
      });
      await this.productRepository.save(product);
      return { ...product, images }
    } catch (error) {
      this.handleException(error)
    }
  }

  async findAll(paginationQuery: PaginationDTO) {
    const { limit = 6, offset = 0 } = paginationQuery

    try {
      const allProducts = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true,
        }
      });
      return allProducts.map(product => ({
        ...product,
        images: product.images.map(image => image.url)
      }))
    } catch (error) {
      this.handleException(error)
    }
  }

  async findOne(term: string) {
    let product = null;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({
        id: term
      });
    }
    if (!product) {
      const queryBuilder = this.productRepository.createQueryBuilder('product')
      product = await queryBuilder
        .where("title ILIKE :term OR slug ILIKE :term", { term: `%${term}%` })
        .leftJoinAndSelect("product.images", "images")
        .getOne()
    }

    if (!product) {
      throw new NotFoundException(`Product with id ${term} not found`);
    }

    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term)
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto , user : Users) {
    const {images, ...toUpdate} = updateProductDto
    const product = await this.productRepository.preload({
      id: id,
      ...toUpdate
    })

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    //Create Query Runner
    // Srive para ejecutar queries de manera manual
    // es como ir realizando las queries paso a paso y se ejecutan solo hasta que se le indique 
    // mediante el commit 
    const queryRunner = this.dataSource.createQueryRunner();
    // conectando a la base de datos
    await queryRunner.connect();
    // Iniciando la transaccion
    await queryRunner.startTransaction();

    try {
      // Cuando se manda el objeto vacio quiere decir que buscamos eliminar todas imas imagenes/
      if (images) { 
        await queryRunner.manager.delete(ProductImage, { product: product.id })
        // Si se mandan imagenes, se crean las imagenes y se guardan en la base de datos
        product.images = images.map(image => this.imageRepository.create({ url: image }))
      }

      product.user = user;

      queryRunner.manager.save(product)
      
      await queryRunner.commitTransaction();
      await queryRunner.release();
      // await this.productRepository.save(product)

      return this.findOnePlain(id)
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleException(error)
    }

    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id)
      await this.productRepository.delete({
        id: product.id
      })
      return { ...product, deleted: true };

    } catch (error) {

      this.handleException(error)

    }
  }

  async removeAll() {
    try {
      console.log('Clearing products');
      const queryBuilder = this.productRepository.createQueryBuilder('product')
      await queryBuilder.delete().where({}).execute()

      return { deleted: true }
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error) {
    this.logger.error(error)
    if (this.errorStatusCodes.includes(error.code)) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: error.detail
      }, HttpStatus.CONFLICT);
    }
  }
}


// 23502 = not-null constraint
// 23505 = duplicate value