"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pokemon_entity_1 = require("./entities/pokemon.entity");
let PokemonService = class PokemonService {
    constructor(pokemonModel) {
        this.pokemonModel = pokemonModel;
    }
    async create(createPokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLowerCase();
        try {
            const pokemonCreated = await this.pokemonModel.create(createPokemonDto);
            return pokemonCreated;
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async findAll() {
        const allPokemons = await this.pokemonModel.find();
        return allPokemons;
    }
    async findOne(searchTerm) {
        try {
            let pokemon;
            if (!isNaN(+searchTerm)) {
                pokemon = await this.pokemonModel.findOne({ no: +searchTerm });
                console.log('pokemon number');
            }
            if ((0, mongoose_2.isValidObjectId)(searchTerm)) {
                pokemon = await this.pokemonModel.findById(searchTerm);
                console.log('pokemon mongo');
            }
            if (!pokemon) {
                pokemon = await this.pokemonModel.findOne({ name: searchTerm.toLowerCase() });
                console.log('pokemon string');
            }
            if (!pokemon) {
                throw new common_1.NotFoundException('Pokemon not found');
            }
            return pokemon;
        }
        catch (error) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: error }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async update(term, updatePokemonDto) {
        const pokemon = await this.findOne(term);
        if (updatePokemonDto.name) {
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }
        try {
            await pokemon.updateOne(updatePokemonDto, { new: true });
            return {
                ...pokemon.toJSON(),
                ...updatePokemonDto
            };
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async remove(id) {
        const result = await this.pokemonModel.deleteOne({ _id: id });
        console.log(result);
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Pokemon not found');
        }
        return result;
    }
    async removeAll() {
        await this.pokemonModel.deleteMany({});
        return 'All pokemons have been removed';
    }
    handleException(error) {
        console.log(error);
        if (error.code === 11000) {
            throw new common_1.BadRequestException(`The value you're trying to update already exists in DB ${JSON.stringify(error.keyValue)}`);
        }
        throw new common_1.InternalServerErrorException('Error creating pokemon');
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pokemon_entity_1.Pokemon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map