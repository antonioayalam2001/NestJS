import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { v4 as uuid } from 'uuid';
import { Game } from './interfaces/game.interface';
@Injectable()
export class GamesService {
    constructor() {
        console.log('CarsService loaded');
    }
    private games: Game[] = [
        { id: uuid(), nombreJuego: 'The Legend of Zelda: Breath of the Wild', consolas: ['Nintendo Switch', 'Wii U'] },
        { id: uuid(), nombreJuego: 'God of War', consolas: ['PlayStation 4', 'PlayStation 5'] },
        { id: uuid(), nombreJuego: 'Red Dead Redemption 2', consolas: ['PlayStation 4', 'Xbox One', 'PC'] },
        { id: uuid(), nombreJuego: 'Super Mario Odyssey', consolas: ['Nintendo Switch'] },
        { id: uuid(), nombreJuego: 'The Witcher 3: Wild Hunt', consolas: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC'] },
        { id: uuid(), nombreJuego: 'Cyberpunk 2077', consolas: ['PlayStation 4', 'Xbox One', 'PlayStation 5', 'PC'] },
        { id: uuid(), nombreJuego: 'Spider-Man: Miles Morales', consolas: ['PlayStation 4', 'PlayStation 5'] },
        { id: uuid(), nombreJuego: 'Halo Infinite', consolas: ['Xbox One', 'Xbox Series X/S', 'PC'] },
        { id: uuid(), nombreJuego: 'Final Fantasy VII Remake', consolas: ['PlayStation 4', 'PlayStation 5'] },
        { id: uuid(), nombreJuego: 'Genshin Impact', consolas: ['PlayStation 4', 'PlayStation 5', 'PC', 'Mobile'] },
        { id: uuid(), nombreJuego: 'Fortnite', consolas: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC', 'Mobile'] },
        { id: uuid(), nombreJuego: 'Animal Crossing: New Horizons', consolas: ['Nintendo Switch'] },
        { id: uuid(), nombreJuego: 'Call of Duty: Warzone', consolas: ['PlayStation 4', 'Xbox One', 'PC'] },
        { id: uuid(), nombreJuego: 'Apex Legends', consolas: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC'] },
        { id: uuid(), nombreJuego: 'Resident Evil Village', consolas: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'PC'] },
        { id: uuid(), nombreJuego: 'Hades', consolas: ['Nintendo Switch', 'PC', 'PlayStation 4', 'PlayStation 5', 'Xbox'] },
        { id: uuid(), nombreJuego: 'Assassin’s Creed Valhalla', consolas: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'PC'] },
        { id: uuid(), nombreJuego: 'FIFA 23', consolas: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'Nintendo Switch', 'PC'] },
        { id: uuid(), nombreJuego: 'Among Us', consolas: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC', 'Mobile'] },
        { id: uuid(), nombreJuego: 'Minecraft', consolas: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC', 'Mobile'] }
    ];
    getGames() {
        return this.games;
    }

    findGameById(id: string) {
        const game = this.games.find(game => game.id === id);
        if (!game) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Another thing',
            }, HttpStatus.NOT_FOUND, {
                cause: error,
                description: `Car with id ${id} not found`,
            });
        }
        return game;
    }

    gamesWithPrices() {
        const gamesWithPrice = this.games.map(game => {
            return {
                ...game,
                price: Math.floor(Math.random() * 1000)
            };
        });
        return gamesWithPrice;
    }

    createGame(game) {
        const gameExists = this.games.find(currentGame => game.nombreJuego === currentGame.nombreJuego);

        if (gameExists) {
            throw new HttpException('Car already exists', HttpStatus.BAD_REQUEST);
        }

        this.games.unshift({
            id: uuid(),
            ...game
        });
        return this.games;
    }

    updateGame(id: string, gameUpdated) {
        const gameToUpdate = this.games.find(game => game.id === id);
        if (!gameToUpdate) {
            throw new HttpException('Car not found', HttpStatus.BAD_REQUEST);
        }
        this.games = this.games.map(game => {
            if (game.id === id) {
                return {
                    ...game,
                    ...gameUpdated
                };
            }
            return game;
        });
        return this.games;
    }
    deleteGame(id: string) {
        const deletedGame = this.games.find(game => game.id === id);
        console.log(deletedGame);

        if (!deletedGame) {
            throw new HttpException('Game not found', HttpStatus.BAD_REQUEST);
        }
        this.games = this.games.filter(game => game.id !== id);
        return deletedGame;
    }
}
