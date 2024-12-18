import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Estilo } from '../models/Estilo';
import { environment } from '../../environments/environment';
import { ReporteEstilosPorUsuarioDTO } from '../models/ReporteEstilosPorUsuarioDTO';
import { CantidadEstiloColorFormaDTO } from '../models/CantidadEstiloColorFormaDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EstiloService {
  private url = `${base_url}/estilos`;
  private listarCambio = new Subject<Estilo[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Estilo[]>(this.url);
  }
  
  insert(eT: Estilo) {
    return this.http.post(this.url, eT);
  }

  getList() {
    return this.listarCambio.asObservable();
  }

  setList(listaNueva: Estilo[]) {
    this.listarCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Estilo>(`${this.url}/${id}`);
  }

  update(eT: Estilo) {
    return this.http.put(this.url,eT);
  }
  cantidadEstilosPorUsuario():Observable<ReporteEstilosPorUsuarioDTO[]>{
    return this.http.get<ReporteEstilosPorUsuarioDTO[]>(`${this.url}/CantidadEstilosPorUsuario`)
  }
  popularidadFormasYColoresEstilo():Observable<CantidadEstiloColorFormaDTO[]>{
    return this.http.get<CantidadEstiloColorFormaDTO[]>(`${this.url}/PopularidadFormasYColoresEstilo`)
  }
  
}
