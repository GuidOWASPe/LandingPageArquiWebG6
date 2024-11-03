import { Item } from "./Item"
import { Usuarios } from "./Usuario"

export class ItemUsuario{
    idItemFavorito: number = 0
    fechaItemFavorito : Date=new Date(Date.now())
    Calificacion:number=0
    us:Usuarios=new Usuarios()
    it:Item=new Item()


}