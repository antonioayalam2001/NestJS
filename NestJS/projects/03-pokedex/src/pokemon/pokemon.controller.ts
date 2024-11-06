import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonQueryDto } from 'src/common/dto/pokemon-query.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() query: PokemonQueryDto) {
    return this.pokemonService.findAllPaginated(query);
  }

  @Get('/seed')
  fillPokemons() {
    return this.pokemonService.fillDatabase();
  }

  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.pokemonService.findOne(searchTerm);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }

  @Delete('')
  removeAll() {
    return this.pokemonService.removeAll();
  }
}
