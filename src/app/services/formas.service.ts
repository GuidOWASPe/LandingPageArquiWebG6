import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forma } from '../models/Forma';
import { environment } from '../environments/environment';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class FormasService {
  private url = `${base_url}/formas`;

  constructor(private http:HttpClient) {}

  list(){
    return this.http.get<Forma[]>(this.url);
  }
}
