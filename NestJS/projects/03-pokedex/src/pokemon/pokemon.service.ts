import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      const pokemonCreated = await this.pokemonModel.create(createPokemonDto)
      return pokemonCreated
    } catch (error) {
      this.handleException(error)
    }
  }

  async findAll() {
    const allPokemons = await this.pokemonModel.find()
    return allPokemons;
  }

  async findOne(searchTerm: string) {
    try {
      let pokemon: Pokemon
      // Buscando cunado es un numero
      // 7 isNaN('7') -> false (es un numero)
      // !false -> true (es un numero)
      if (!isNaN(+searchTerm)) {
        pokemon = await this.pokemonModel.findOne({ no: +searchTerm })
        console.log('pokemon number');
      }
      //Buscando por MongoID
      
      if (isValidObjectId(searchTerm)) {
        pokemon = await this.pokemonModel.findById(searchTerm)
        console.log('pokemon mongo');
      }
      
      if (!pokemon) {
        // Buscando cuando es un texto
        pokemon = await this.pokemonModel.findOne({ name: searchTerm.toLowerCase() })
        console.log('pokemon string');
      }

      if (!pokemon) {
        throw new NotFoundException('Pokemon not found')
      }

      return pokemon
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: error}, HttpStatus.NOT_FOUND)
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)
    
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    }
    try {
      await pokemon.updateOne(updatePokemonDto, {new: true})
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      }
    } catch (error) {
      this.handleException(error)
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id })
    console.log(result);
    
    if (result.deletedCount === 0) {
      throw new NotFoundException('Pokemon not found')
    }
    return result

  }

  async removeAll() {
    await this.pokemonModel.deleteMany({})
    return 'All pokemons have been removed'
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`The value you're trying to update already exists in DB ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException('Error creating pokemon')
  }
}
