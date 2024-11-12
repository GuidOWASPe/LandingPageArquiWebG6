import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentarios } from '../models/Comentario';
import { ComentariosNegativosFrecuentesDTO } from '../models/ComentariosNegativosFrecuentesDTO';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentarios[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comentarios[]>(this.url);
  }

  insert(com: Comentarios) {
    return this.http.post(this.url, com);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Comentarios[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){
    return this.http.get<Comentarios>(`${this.url}/${id}`)
  }

  update(comen: Comentarios){
    return this.http.put(this.url, comen)
  }

  obtenerComentariosNegativosFrecuentes():Observable<ComentariosNegativosFrecuentesDTO[]>{
    return this.http.get<ComentariosNegativosFrecuentesDTO[]>(`${this.url}/ListarCantidadComentariosNegativos`)
  }
}
