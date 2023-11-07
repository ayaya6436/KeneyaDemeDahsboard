import { UserService } from './../users/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaladiesService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private userService:UserService) { }




  getMaladieList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/maladies');
  }


  deleteMaladie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/maladie/${id}`, { responseType: 'text' });
  }

  getMaladie(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/maladie/${id}`);
  }




updateMaladie(id: number, maladie: any, image: File, audio: File): Observable<any> {
  const formData = new FormData();
  formData.append('maladies', JSON.stringify(maladie));
  formData.append('image', image);
  formData.append('audio', audio);



  return this.http.put<any>(`${this.baseUrl}/maladie/${id}`, formData);
}

createMaladie(maladie: any, image: File, audio: File): Observable<any> {
  const formData = new FormData();
  formData.append('maladies', JSON.stringify(
    {
      "id" : maladie.id,
      "nom" : maladie.nom,
      "description" : maladie.description,
      "users" : {
        'id': this.userService.getCurrentUser()?.id,
      }

    }
  ));
  formData.append('image', image);
  formData.append('audio', audio);




  return this.http.post<any>(`${this.baseUrl}/maladie`, formData);
}




}
