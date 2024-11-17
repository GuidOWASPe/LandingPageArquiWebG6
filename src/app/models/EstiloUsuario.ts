import { Estilo } from './Estilo';
import { Usuarios } from './Usuarios';

export class EstiloUsuario {
  idEstiloUsuario: number = 0;
  fechaEstiloFav: Date | null = null;
  calificacion: number = 0;
  usuario: Usuarios = new Usuarios();
  estilo: Estilo = new Estilo();
}
