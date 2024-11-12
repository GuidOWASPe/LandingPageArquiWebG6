import { Item } from './Item';
import { Rostro } from './Rostro';

export class Estilo {
  idEstilo: number = 0;
  nombreEstilo: string = '';
  codigoColor: string = '';
  fechaCreado: Date = new Date(Date.now());
  imagenEstilo: string = '';
  ro: Rostro = new Rostro();
  it: Item = new Item();
}
