import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  validate(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/validate/${email}`);
  }
}
