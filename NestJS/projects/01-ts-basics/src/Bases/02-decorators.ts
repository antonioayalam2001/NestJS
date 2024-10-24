const MyDecorator = () => { 
    return (target: Function) => { 
        console.log('MyDecorator called on', target) 
        return NewPokemon
    }
}

class NewPokemon {
    constructor(
        public name: string,
        public type: string
    ){}
    scream() {
        console.log(`No quiero gritar`)
    }
    talk = () => console.log(`Soy pokemon regresado por Decorator`)
    extraAction = () => console.log(`Metodo agregado mediante el decorator`)
}


@MyDecorator()
class Pokemon {
    constructor(
        public name: string,
        public type: string
    ){}
    scream() {
        console.log(`I'm ${this.name} and I'm a ${this.type} Pokemon!`)
    }
    talk = () => console.log(`I'm ${this.name} and I'm a ${this.type} Pokemon!`)
}

const pikachu = new Pokemon('Pikachu', 'Electric')
//Este metodo no existe en la clase Pokemon
// pero se agrega mediante el decorador
// pikachu.extraAction()
pikachu.talk()