import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthServiceLogger')
  private readonly errorStatusCodes = ['23505', '23502']

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {
  }


  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);


      const { password, role, isActive, ...user } = newUser

      //JSON web token

      return { ...user, token: this.getJwtToken({ id: user.id }) };

    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    const allUsers = await this.usersRepository.find({
      where: {
        isActive: true
      }
    });

    return {
      allUsers,
      message: 'This action returns all auths',
      totalUsers: allUsers.length
    };
  }

  async findUser(body: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: body.email,
      },
      select: ['email', 'password', "isActive", "id"]
    });

    if (!user || !user.isActive) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Checking password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    delete user.password;

    return {
      user,
      token: this.getJwtToken({ id: user.id, })
    }
  }

  update(id: number, updateuserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async removeAll() {
    try {
      console.log('Clearing users');
      const queryBuilder = this.usersRepository.createQueryBuilder('users')
      await queryBuilder.delete().where({}).execute()

      return { deleted: true }
    } catch (error) {
      this.handleException(error)
    }
  }

  private getJwtToken(payload: JWTPayload) {
    const token = this.jwtService.sign(payload)
    return token
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

  async privateMethod() {

    return {
      message: 'This is a private route',
      data: 'You are able'
    }
  }

  async checkAuthStatus(user: Users) {
    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }
  }
}
