import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasService {
  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient) { }




  getCasList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/cas');
  }


  deleteCas(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cas/${id}`, { responseType: 'text' });
  }

  // getMaladie(id: number): Observable<Object> {
  //   return this.http.get(`${this.baseUrl}/maladie/${id}`);
  // }


  updateCas(id: number, cas: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('cas', JSON.stringify(cas));
    formData.append('image', image);

    return this.http.put<any>(`${this.baseUrl}/cas/${id}`, formData);
  }


  createCas(cas: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('cas', JSON.stringify(
      {
        "id" : cas.id,

      }
    ));
    formData.append('image', image);

    return this.http.post<any>(`${this.baseUrl}/cas`, formData);
  }

  getNumberOfCas(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/cas/count`);
  }
}
