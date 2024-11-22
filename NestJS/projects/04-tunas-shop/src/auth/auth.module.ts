import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from './entities/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Users
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Garantiza que las variables de entorno ya habran sido correctamente cargadas y estan disponibles para utilizar
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService : ConfigService
      ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      })
    }
    )
  ],
  exports: [JWTStrategy, PassportModule, TypeOrmModule, JwtModule]
})
export class AuthModule { }
