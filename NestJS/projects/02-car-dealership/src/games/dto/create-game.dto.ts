import { IsArray, IsString } from "class-validator"

export class CreateGameDto {
    //Propiedades que esperamos obtener dentro del Body de una peticion POST
    // al momento de querer crear un nuevo juego
    @IsString()
    readonly nombreJuego: string
    @IsArray()
    @IsString({
        each: true,
        message: 'Cada consola debe ser un string' //Mensaje de error personalizado
     })
    readonly consolas: string[]
}