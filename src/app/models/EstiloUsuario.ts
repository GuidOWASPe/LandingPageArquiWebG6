import { Estilo } from "./Estilo"
import { Usuarios } from "./Usuarios"

export class EstiloUsuario
{
    idEstiloFav:number=0
    calificacionEstilo:number=0
    fechaEstiloFav:Date=new Date(Date.now())
    es:Estilo=new Estilo()
    us:Usuarios=new Usuarios()
}
