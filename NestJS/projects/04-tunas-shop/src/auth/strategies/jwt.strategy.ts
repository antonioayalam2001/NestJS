import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from "../entities/users.entity";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";


//Todas las estrategias son Providers
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        configService : ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            //Especificando de donde viene el token en la request
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    // Solo se manda a llmar cuando el JWT no ha expirado
    // Y cuando la firma coincide y es valida
    async validate(payload: JWTPayload): Promise<Users> {
        const { id } = payload;
        //En este punto podemos realizar una consulta a la base de datos para verificar el estado
        // que tiene el usuario y poder devolver las verificaciones correspondientes.

        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Inactive user');
        }
        
        //Cualquier cosa que se devuelva en este metodo validate, se va a colocar en el request
        // Ejemplo: req.user = user
        return user;
    }
}