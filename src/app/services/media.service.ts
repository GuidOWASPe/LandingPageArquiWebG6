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
    return this.http.post('https://trabajo-g06.onrender.com/media/upload', formData);
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`https://trabajo-g06.onrender.com/media/delete/${filename}`, { responseType: 'text' });
  }
}

  