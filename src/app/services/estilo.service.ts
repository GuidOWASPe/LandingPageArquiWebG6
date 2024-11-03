import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tipo } from '../models/Tipo';
import { HttpClient } from '@angular/common/http';
import { Estilo } from '../models/Estilo';

@Injectable({
  providedIn: 'root'
})
export class EstiloService {
  private url = `${base_url}/estilo`;
  private listarCambio = new Subject<Tipo[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Estilo[]>(this.url);
  }

  insert(eT: Estilo) {
    return this.http.post(this.url, eT);
  }

  getList() {
    return this.listarCambio.asObservable();
  }

  setList(listaNueva: Estilo[]) {
    this.listarCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Estilo>(`${this.url}/${id}`);
  }

  update(eT: Estilo) {
    return this.http.put(this.url,eT);
  }
}
