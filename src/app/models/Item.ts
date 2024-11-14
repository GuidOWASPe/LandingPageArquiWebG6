import { Tipo } from "./Tipo";

export class Item{
    idItem: number = 0;
    nombreItem: string = '';
    descripcionItem: string = '';
    calificacionItem: number = 0;
    nrUsos: number = 0;
    imagen: string = '';
    ti: Tipo = new Tipo();
}