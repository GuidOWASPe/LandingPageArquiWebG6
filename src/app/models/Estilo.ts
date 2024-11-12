import { Item } from './Item';
import { Rostro } from './Rostro';

export class Estilo {
  idEstilo: number = 0;
  NombreEstilo: string = '';
  CodigoColor: string = '';
  FechaCreado: Date = new Date(Date.now());
  ImagenEstilo: string = '';
  ro: Rostro = new Rostro();
  it: Item = new Item();
}
