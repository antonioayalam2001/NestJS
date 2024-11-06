import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonQueryDto } from 'src/common/dto/pokemon-query.dto';
import { ConfigService } from '@nestjs/config';
export declare class PokemonService {
    private readonly pokemonModel;
    private readonly envConfigService;
    private DEFAULT_LIMIT;
    constructor(pokemonModel: Model<Pokemon>, envConfigService: ConfigService);
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
    findAllPaginated(paginationDTO: PokemonQueryDto): Promise<(import("mongoose").Document<unknown, {}, Pokemon> & Pokemon & Required<{
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
    fillDatabase(): Promise<void>;
    private handleException;
}
