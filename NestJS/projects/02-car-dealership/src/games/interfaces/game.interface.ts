export interface Game{
    id: string;
    nombreJuego: string;
    consolas: string[];
    price?: number;
}

export interface GameBody {
    nombreJuego: string;
    consolas: string[];
}