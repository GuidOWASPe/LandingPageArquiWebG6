import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RostroService {
  private apiUrl = 'http://127.0.0.1:5000'; // Cambia la URL si es diferente

  constructor(private http: HttpClient) {}

  getFaceShape(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}http://127.0.0.1:5000/api/detectar-forma`, data);
  }
}
