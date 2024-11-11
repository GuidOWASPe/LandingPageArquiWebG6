import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstiloUsuario } from '../models/EstiloUsuario';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EstiloUsuarioService {
  private url = `${base_url}/estiloUsuario`;
  listaCambio=new Subject<EstiloUsuario[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<EstiloUsuario[]>(this.url);
  }
  insert(eu: EstiloUsuario) {
    return this.http.post(this.url, eu);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: EstiloUsuario[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<EstiloUsuario>(`${this.url}/${id}`);
  }

  update(esu: EstiloUsuario){
    return this.http.put(this.url, esu);
  }
}
