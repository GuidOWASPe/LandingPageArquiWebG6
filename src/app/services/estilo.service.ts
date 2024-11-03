import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Estilo } from '../models/Estilo';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class EstiloService {
  private url = `${base_url}/estilos`;
  private listaCambio = new Subject<Estilo[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Estilo[]>(this.url);
  }

  insert(e: Estilo) {
    return this.http.post(this.url, e);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Estilo[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Estilo>(`${this.url}/${id}`)
  }

  update(es: Estilo){
    return this.http.put(this.url, es)
  }
}
