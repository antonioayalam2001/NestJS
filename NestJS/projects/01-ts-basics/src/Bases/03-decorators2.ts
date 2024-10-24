const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        console.log(target)
        console.log({memberName});
        
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            // La linea al estar comentada no se ejecuta la función
            // propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

const UpperCaseDecorator = () => {
    return (target: any, memberName: string) => {
        let value: string;

        // Definir un getter y setter para la propiedad decorada
        Object.defineProperty(target, memberName, {
            get() {
                return value ? value.toUpperCase() : '';
            },
            set(newValue: string) {
                value = newValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
};

class Pokemon {
    @UpperCaseDecorator()
    name: string = ''
    type: string = ''
    constructor(
        name: string,
        type: string
    ) { 
        this.name = name
        this.type = type
    }
    @Deprecated('This method is deprecated')
    scream() {
        console.log(`I'm ${this.name} and I'm a ${this.type} Pokemon!`)
    }
    talk = () => console.log(`I'm ${this.name} and I'm a ${this.type} Pokemon!`)
}

const pikachu = new Pokemon('Pikachu', 'Electric')
pikachu.scream()

const DeprecatedDirect = (reason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      const originalMethod = propertyDescriptor.value;
        console.log(propertyDescriptor.value);
        
        propertyDescriptor.value = function (...args: any[]) {
        console.warn(`Method ${memberName} is deprecated: ${reason}`);
        return originalMethod.apply(this, args);
      };
      return propertyDescriptor;
    };
  };
  
  class MiClase {
    @DeprecatedDirect('Este método será eliminado en la próxima versión.')
    metodoAntiguo() {
      console.log('Método antiguo ejecutado.');
    }
  }
  
  const instancia = new MiClase();
instancia.metodoAntiguo();  // Muestra advertencia y ejecuta el método
