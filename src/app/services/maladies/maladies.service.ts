import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaladiesService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient) { }

  createMaladie(maladies: object): Observable<object> {
    const params = new HttpParams().set('maladies', JSON.stringify(maladies));
    return this.http.post(`${this.baseUrl}/maladie`, null, { params });
  }


  getMaladieList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/maladies');
  }


  deleteMaladie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/maladie/${id}`, { responseType: 'text' });
  }

  getMaladie(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/maladie/${id}`);
  }

  updateMaladie(id: number, data: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/maladie/${id}`, data);
  }
}
