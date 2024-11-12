import { Item } from "./Item";
import { Rostro } from "./Rostro";


export class Estilo {
  idEstilo: number = 0
  nombreEstilo: string = ""
  codigoColor: string = ""
  ro: Rostro = new Rostro()
  it: Item = new Item();
}
