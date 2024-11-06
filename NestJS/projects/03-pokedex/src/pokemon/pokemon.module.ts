import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { SeedModule } from 'src/seed/seed.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name ,
        schema: PokemonSchema        
      }
    ]),
    ConfigModule
    // SeedModule
  ],
  // Exportamon directamente el modelode Mongoose, para permitir que quien lo importe
  // pueda acceder a las caracteristicas de la base de datos
  exports: [MongooseModule]
  // si solo exportamos el Servicio limitamos las funcionalidades a 
  // las que estan definidas en el servicio, osea solo esos metodos
  // exports: [PokemonService]
})
export class PokemonModule {}
