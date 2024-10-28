import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/Rol';
import { Subject } from 'rxjs';
<<<<<<< HEAD
const base_url = environment.base
=======

const base_url=environment.base;
>>>>>>> 85cc9481059a073c33eccf22ca6c9261c8fc8cc1
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http:HttpClient) { }

  constructor(private http: HttpClient) {   }
  list(){
    return this.http.get<Rol[]>(this.url);
  }

<<<<<<< HEAD
  insert(ro: Rol) {
    return this.http.post(this.url, ro);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Rol>(`${this.url}/${id}`)
  }

  update(ro: Rol){
    return this.http.put(this.url, ro)
  }
}
=======
  
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
>>>>>>> 85cc9481059a073c33eccf22ca6c9261c8fc8cc1
