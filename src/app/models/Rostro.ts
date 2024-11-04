import { Forma } from "./Forma"
import { Usuarios } from "./Usuarios"

export class Rostro
{
    idRostro:number=0
    nombre:string=""
    imagenRostro:string=""
    usu:Usuarios=new Usuarios()
    fo:Forma=new Forma()
}