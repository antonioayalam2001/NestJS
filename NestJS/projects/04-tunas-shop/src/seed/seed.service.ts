import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ){}

  async runSeed() {
    await this.deleteTables();
    
    const adminUser = await this.insertUsers();

    await this.fillDatabase(adminUser);
    
    return {
      message: "Base de datos llenada"
    }
    
  }

  private async insertUsers() {
    const seedUsers = initialData.users

    const users: Users[] = []

    seedUsers.forEach(user => {
      users.push(this.usersRepository.create(user))
    })

    await this.usersRepository.save(users)

    return users[0]
  }


  private async fillDatabase(user: Users) { 
    await this.productsService.removeAll();
    
    const seedProducts = initialData.products

    const insertPromises = []

    seedProducts.forEach(product => { 
      insertPromises.push(this.productsService.create(product, user))
    })

    await Promise.all(insertPromises)

    return true

  }


  private async deleteTables() {
    await this.productsService.removeAll();

    const queryBuilder = this.usersRepository.createQueryBuilder()
    await queryBuilder.delete().where({}).execute()

  }

}
