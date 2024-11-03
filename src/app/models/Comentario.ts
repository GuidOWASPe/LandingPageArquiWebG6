import { Estilo } from "./Estilo"
import { Usuarios } from "./Usuario"

export class Comentarios{


    idcomentario: number = 0
    contenido: string = ""
    likes:number=0
    fecha_publicada : Date=new Date(Date.now())
    us:Usuarios=new Usuarios()
    et:Estilo =new Estilo()


}