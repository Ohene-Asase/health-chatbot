import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {   }
  getResponse(message: string): Observable<any>{
    const url = `http://localhost:3000/api/chatbot/${message}`;
    return this.http.get(url);
  }


}
