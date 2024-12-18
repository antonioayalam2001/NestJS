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
exports.PokemonController = void 0;
const common_1 = require("@nestjs/common");
const parse_mongo_id_pipe_1 = require("../common/pipes/parse-mongo-id/parse-mongo-id.pipe");
const create_pokemon_dto_1 = require("./dto/create-pokemon.dto");
const update_pokemon_dto_1 = require("./dto/update-pokemon.dto");
const pokemon_service_1 = require("./pokemon.service");
const pokemon_query_dto_1 = require("../common/dto/pokemon-query.dto");
let PokemonController = class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }
    create(createPokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }
    findAll() {
        return this.pokemonService.findAll();
    }
    findAllPaginated(query) {
        return this.pokemonService.findAllPaginated(query);
    }
    fillPokemons() {
        return this.pokemonService.fillDatabase();
    }
    findOne(searchTerm) {
        return this.pokemonService.findOne(searchTerm);
    }
    update(term, updatePokemonDto) {
        return this.pokemonService.update(term, updatePokemonDto);
    }
    remove(id) {
        return this.pokemonService.remove(id);
    }
    removeAll() {
        return this.pokemonService.removeAll();
    }
};
exports.PokemonController = PokemonController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pokemon_dto_1.CreatePokemonDto]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pokemon_query_dto_1.PokemonQueryDto]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findAllPaginated", null);
__decorate([
    (0, common_1.Get)('/seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "fillPokemons", null);
__decorate([
    (0, common_1.Get)(':searchTerm'),
    __param(0, (0, common_1.Param)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pokemon_dto_1.UpdatePokemonDto]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PokemonController.prototype, "removeAll", null);
exports.PokemonController = PokemonController = __decorate([
    (0, common_1.Controller)('pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
//# sourceMappingURL=pokemon.controller.js.map