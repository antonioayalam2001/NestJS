import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
export declare class PokemonService {
    private readonly pokemonModel;
    constructor(pokemonModel: Model<Pokemon>);
    create(createPokemonDto: CreatePokemonDto): Promise<import("mongoose").Document<unknown, {}, Pokemon> & Pokemon & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Pokemon> & Pokemon & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    findOne(searchTerm: string): Promise<Pokemon>;
    update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<{
        name: string;
        no?: number;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
    removeAll(): Promise<string>;
    private handleException;
}
