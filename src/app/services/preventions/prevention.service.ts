
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaladiesService } from '../maladies/maladies.service';

@Injectable({
  providedIn: 'root'
})
export class PreventionService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private maladieService:MaladiesService) { }


getMaladieList(){
  this.maladieService.getMaladieList();
  return this.http.get(`${this.baseUrl}/maladies`);
}

  getPreventionList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/preventions');
  }


  deletePrevention(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/prevention/${id}`, { responseType: 'text' });
  }

  getPrevention(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/prevention/${id}`);
  }


  updatePrevention(id: number, prevention: any, image: File, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('preventions', JSON.stringify(prevention));
    formData.append('image', image);
    formData.append('audio', audio);



    return this.http.put<any>(`${this.baseUrl}/prevention/${id}`, formData);
  }


  createPrevention(prevention: any, image: File, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('preventions', JSON.stringify(prevention));
    formData.append('image', image);
    formData.append('audio', audio);




    return this.http.post<any>(`${this.baseUrl}/prevention`, formData);
  }



}
