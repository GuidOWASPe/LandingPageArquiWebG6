import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/Rol';
import { Subject } from 'rxjs';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {   }
  list(){
    return this.http.get<Rol[]>(this.url);
  }

  
  insert(ve: Rol) {
    return this.http.post(this.url, ve);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Rol[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(v: Rol){
    return this.http.put(this.url,v)
  }

}