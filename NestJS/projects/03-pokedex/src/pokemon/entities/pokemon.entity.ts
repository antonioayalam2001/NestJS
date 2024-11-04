
// Al estar extendiendo de Document, se esta utilizando el modelo de Mongoose
// Lo que permite realizar las consultas y una serie de metodos mas
// relacioanada con la base de datos

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema() //Decorador que indica que es un esquema de Mongoose y crea una coleccion en la base de datos
export class Pokemon extends Document {

    ///_id string Es colocado de forma automatica por Mongo
    @Prop({
        unique: true,
        index: true
    })
    name: string
    @Prop({
        unique: true,
        index: true
    })
    no: number
}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon) //Crea un esquema de Mongoose a partir de la clase Pokemon