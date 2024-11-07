import { Rol } from "./Rol"

export class Usuarios{
    idUsuario: number = 0
     username: string = ""
     password: string = ""
     correoUsuario: string = ""
     fechaNacimientoUsuario:Date=new Date(Date.now())
     fechaRegistroUsuario:Date=new Date(Date.now())
fotoPerfilUsuario: string = ""
paisUsuario: string = ""
sexoUsuario: string = ""
enabled:boolean=true
rol: Rol=new Rol


}