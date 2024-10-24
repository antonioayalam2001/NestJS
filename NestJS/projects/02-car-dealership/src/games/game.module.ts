import { Module } from '@nestjs/common';
import { GamesController } from './game.controller';
import { GamesService } from './game.service';



@Module({
  controllers: [GamesController],
  providers: [GamesService]
})
export class CarsModule { }
