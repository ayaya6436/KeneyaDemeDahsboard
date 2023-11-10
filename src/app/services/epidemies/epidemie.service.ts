import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaladiesService } from '../maladies/maladies.service';

@Injectable({
  providedIn: 'root'
})
export class EpidemieService {

  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private maladieService:MaladiesService) { }


getMaladieList(){
  this.maladieService.getMaladieList();
  return this.http.get(`${this.baseUrl}/maladies`);
}

  getEpidemieList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/epidemies');
  }


  deleteEpidemie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/epidemie/${id}`, { responseType: 'text' });
  }

  getEpidemie(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/epidemie/${id}`);
  }


  updateEpidemie(id: number, epidemie: any,  audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('epidemies', JSON.stringify(epidemie));
    formData.append('audio', audio);

    return this.http.put<any>(`${this.baseUrl}/epidemie/${id}`, formData);
  }


  createEpidemie(epidemie: any, audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('epidemies', JSON.stringify(epidemie));
    formData.append('audio', audio);

    return this.http.post<any>(`${this.baseUrl}/epidemie`, formData);
  }
}
