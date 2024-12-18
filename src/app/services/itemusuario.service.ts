import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ItemsMasUsadosDTO } from '../models/ItemsMasUsadosDTO';
import { ItemUsuario } from '../models/ItemUsuario';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ItemusuarioService {
  private url = `${base_url}/itemUsuario`;
  private listaCambio = new Subject<ItemUsuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ItemUsuario[]>(this.url);
  }

  insert(itemU: ItemUsuario) {
    return this.http.post(this.url, itemU);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: ItemUsuario[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ItemUsuario>(`${this.url}/${id}`);
  }

  update(itemUs: ItemUsuario) {
    return this.http.put(this.url, itemUs);
  }

  obtenerItemsPorNroUsos(): Observable<ItemsMasUsadosDTO[]> {
    return this.http.get<ItemsMasUsadosDTO[]>(
      `${this.url}/ListarItemsPorNroUsos`
    );
  }
}
