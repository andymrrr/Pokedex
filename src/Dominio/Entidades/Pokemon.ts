export interface Pokemon {
    id: number;
    nombre: string;
    tipos: string[];
    avatar: string;
    sprites: string[]
    color: string;

    juegos: string[];
    estadisticas: Estadistica[];
    habilidades: string[];
    movimientos: Movimiento[];
}

interface Estadistica{
    nombre: string;
    valor: number;
}

interface Movimiento {
    nombre: string;
    level: number;
}