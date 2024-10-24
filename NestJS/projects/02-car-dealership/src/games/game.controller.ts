import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { GamesService } from './game.service';
import { GameBody } from './interfaces/game.interface';
import { CreateGameDto } from './dto/create-game.dto';



@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {
        console.log('GamesController loaded');
    }
    @Get(['prices', 'all'])
    carPrices() {
        return this.gamesService.gamesWithPrices();;
    }

    @Get(':id/:name')
    findCarByIdAngregisterName(@Param('id') id: string, @Param('name') name: String) {
        return this.gamesService.findGameById(id).nombreJuego + ' ' + name
    }

    @Get(':id')
    findGameByID(@Param('id', ParseUUIDPipe ) id: string) {
        const car = this.gamesService.findGameById(id);
        return car;
    }
    @Get()
    getallGames() {
        return this.gamesService.getGames();
    }
    @Post()
    createGame(@Body() createGameDto: CreateGameDto) {
        console.log(createGameDto);

        if (!createGameDto.nombreJuego) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        const updatedCars = this.gamesService.createGame(createGameDto);
        return updatedCars;
    }

    @Put(':id/')
    updateGame(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: CreateGameDto) {

        if (!data.nombreJuego) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        const updatedGames = this.gamesService.updateGame(id, data);
        return updatedGames;
    }
    @Delete(':id')
    deleteCar(@Param('id') id: string) {
        const deletedElement = this.gamesService.deleteGame(id);
        return {
            deletedElement

        };
    }
}
