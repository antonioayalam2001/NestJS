import axios from "axios"
import { PokeapiReponse } from "./types"

// Resolviento la SUSITUTCION DE LISKOV
// Realizamos la creacion de una interfaz que nos permita realizar la inyeccion de dependencias
// Las interfaces solo declaran los metodos y tipos de dato que deben tener las clases
// que las implementan, PERO LA IMPLEMENTACION DE LOS METODOS SE REALIZA EN LAS CLASES

interface PokeApiDependency { 
  get<T>(url: string): Promise<T>
}

// Hay error debido a que se esta implementando la interfaz, pero no se esta implementando el metodo
class NativeFetch implements PokeApiDependency { 
  async getPokemons(url: string) { 
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  async get<T>(url: string): Promise<T> {
    throw new Error("Method not implemented.")
  }
}

class PokeApiFetch implements PokeApiDependency {

  async get<T>(url : string) {
    const response = await fetch(url)
    const data: T = await response.json()
    return data
}  
}

class Axios implements PokeApiDependency {
  private readonly axios = axios
  async get<T>(url : string) {
    const {data} = await this.axios.get<T>(url)
    return data
}
}


class Pokemon {
  constructor(
    public name: string,
    public id: number,
    private readonly dependecy: PokeApiDependency
  ) { }

    async get() {
      const data = await this.dependecy.get<PokeapiReponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      this.setCorrectName(data.name)
      return data
  }
  
  private setCorrectName(name: string) {
    this.name = name
  }

}

const pokeApiFetch = new PokeApiFetch()
const axiosInstance = new Axios()
export const Charmander = new Pokemon('Charmander', 4, axiosInstance)
export const Ditto = new Pokemon('Ditto', 2, pokeApiFetch)
Charmander.get().then(console.log)
Ditto.get().then(data => {
  console.log(data)
  console.log(Ditto.name);
})

