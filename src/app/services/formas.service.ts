import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forma } from '../models/Forma';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class FormasService {
  private url = `${base_url}/formas`;
  private listaCambio = new Subject<Forma[]>();

  constructor(private http:HttpClient) {}

  list(){
    return this.http.get<Forma[]>(this.url);
  }

  insert(fo: Forma){
    return this.http.post(this.url, fo);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Forma[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Forma>(`${this.url}/${id}`);
  }

  update(f: Forma){
    return this.http.put(this.url, f);
  }
}
