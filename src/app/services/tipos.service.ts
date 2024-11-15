import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/Tipo';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TiposService {
  private url = `${base_url}/tipos`;
  private listaCambio = new Subject<Tipo[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Tipo[]>(this.url);
  }
  
  insert(tp: Tipo) {
    return this.http.post(this.url, tp);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Tipo[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Tipo>(`${this.url}/${id}`)
  }

  update(tp: Tipo){
    return this.http.put(this.url, tp)
  }
}
