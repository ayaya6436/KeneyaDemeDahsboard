import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient) { }

  createUser(users: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/user', users);
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/users');
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`, { responseType: 'text' });
  }

  getUser(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  updateUser(id: number, data: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/user/${id}`, data);
  }


  connexion(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
