import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estilo } from '../models/Estilo';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EstiloService {
  private url = `${base_url}/estilos`;
  listaCambio=new Subject<Estilo[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Estilo[]>(this.url);
  }
  insert(tt: Estilo) {
    return this.http.post(this.url, tt);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Estilo[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Estilo>(`${this.url}/${id}`);
  }

  update(f: Estilo){
    return this.http.put(this.url, f);
  }
}
