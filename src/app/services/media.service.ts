import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData:FormData): Observable<any>{
    return this.http.post('http://localhost:8080/media/upload', formData);
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/media/delete/${filename}`, { responseType: 'text' });
  }
}

  