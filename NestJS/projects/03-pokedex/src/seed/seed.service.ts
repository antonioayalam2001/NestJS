import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke=response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    //Esto cuando queremos utilizar los metodos de un servicio
    // private readonly seedService: SeedService
    private readonly http:AxiosAdapter
  ) { }

  async executeSeed() {
    const formattedData = await this.getPokemons()
    return formattedData;
  }
  
  async fillDataBaseFromSeed() {
    await this.pokemonModel.deleteMany({})
    console.log('Pokemons Deleted');
    
    const formattedData = await this.getPokemons()
    await this.pokemonModel.insertMany(formattedData)
  
    return 'Database filled';
  }

  async getPokemons() {
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
    
    const formattedData = data.results.map(({name,url})=> {
      const segments = url.split('/')
      const pokemonNumber = +segments[segments.length - 2]
      return {
        no: pokemonNumber,
        name: name
      }
    });
    return formattedData;
  }
}
