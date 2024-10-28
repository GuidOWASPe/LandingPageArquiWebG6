import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Color } from '../models/Color';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ColoresService {
  private url = `${base_url}/colores`;
  private listaCambio = new Subject<Color[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Color[]>(this.url);
  }

  insert(co: Color) {
    return this.http.post(this.url, co);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Color[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Color>(`${this.url}/${id}`)
  }

  update(c: Color){
    return this.http.put(this.url, c)
  }
}
