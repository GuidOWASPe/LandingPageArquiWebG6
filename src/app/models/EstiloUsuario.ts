import { Estilo } from "./Estilo"
import { Usuarios } from "./Usuarios"

export class EstiloUsuario
{
    idEstiloFav:number=0
    fechaEstiloFav:Date=new Date(Date.now())
    calificacion:number=0
    usuario:Usuarios=new Usuarios()
    estilo:Estilo=new Estilo()
    
}