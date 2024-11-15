import { Item } from './Item';
import { Usuarios } from './Usuarios';
export class ItemUsuario {
  idItemUsuario:number=0
  fechaItemFavorito: Date = new Date(Date.now());
  calificacion: number = 0;
  us: Usuarios = new Usuarios();
  it: Item = new Item();
}
