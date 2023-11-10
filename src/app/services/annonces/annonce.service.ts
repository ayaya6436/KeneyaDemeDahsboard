import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private userService:UserService) { }




  getAnnonceList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/annonces');
  }


  deleteAnnonce(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/annonce/${id}`, { responseType: 'text' });
  }

  // getMaladie(id: number): Observable<Object> {
  //   return this.http.get(`${this.baseUrl}/maladie/${id}`);
  // }


  updateAnnonce(id: number, annonce: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('annonces', JSON.stringify(annonce));
    formData.append('image', image);

    return this.http.put<any>(`${this.baseUrl}/annonce/${id}`, formData);
  }


  createAnnonce(annonce: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('annonces', JSON.stringify(
      {
        "id" : annonce.id,
        "titre" : annonce.titre,
        "description" : annonce.description,
        "users" : {
          'id': this.userService.getCurrentUser()?.id,
        }

      }
    ));
    formData.append('image', image);

    return this.http.post<any>(`${this.baseUrl}/annonce`, formData);
  }
}
