import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Item } from '../models/Item';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = `${base_url}/items`;
  private listaCambio = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Item[]>(this.url);
  }

  insert(it: Item) {
    return this.http.post(this.url, it);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Item[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Item>(`${this.url}/${id}`)
  }

  update(item: Item){Item
    return this.http.put(this.url, item)
  }
}
