import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonQueryDto } from 'src/common/dto/pokemon-query.dto';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    create(createPokemonDto: CreatePokemonDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    findAllPaginated(query: PokemonQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    fillPokemons(): Promise<void>;
    findOne(searchTerm: string): Promise<import("./entities/pokemon.entity").Pokemon>;
    update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<{
        name: string;
        no?: number;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
    removeAll(): Promise<string>;
}
