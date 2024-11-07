import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Rostro } from '../models/Rostro';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RostroService {
  private url = `${base_url}/rostros`;
  listaCambio=new Subject<Rostro[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Rostro[]>(this.url);
  }
  insert(ro: Rostro) {
    return this.http.post(this.url, ro);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Rostro[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Rostro>(`${this.url}/${id}`);
  }
  update(ro: Rostro) {
    return this.http.put(this.url,ro);
  }
}
