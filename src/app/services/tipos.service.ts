import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/Tipo';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TiposService {
  private url = `${base_url}/tipos`;

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Tipo[]>(this.url);
  }
}
