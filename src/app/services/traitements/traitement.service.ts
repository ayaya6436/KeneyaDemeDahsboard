import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaladiesService } from '../maladies/maladies.service';

@Injectable({
  providedIn: 'root'
})
export class TraitementService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private maladieService:MaladiesService) { }


getMaladieList(){
  this.maladieService.getMaladieList();
  return this.http.get(`${this.baseUrl}/maladies`);
}

  getTraitementList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/traitements');
  }


  deleteTraitement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/traitement/${id}`, { responseType: 'text' });
  }

  getTraitement(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/traitement/${id}`);
  }


  updateTraitement(id: number, prevention: any, image: File, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('traitements', JSON.stringify(prevention));
    formData.append('image', image);
    formData.append('audio', audio);



    return this.http.put<any>(`${this.baseUrl}/traitement/${id}`, formData);
  }


  createTraitement(prevention: any, image: File, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('traitements', JSON.stringify(prevention));
    formData.append('image', image);
    formData.append('audio', audio);




    return this.http.post<any>(`${this.baseUrl}/traitement`, formData);
  }
}
