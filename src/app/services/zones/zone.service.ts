import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaladiesService } from '../maladies/maladies.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {


  private baseUrl = 'http://localhost:8080/keneya';

  constructor(private http:HttpClient,private maladieService:MaladiesService) { }


getMaladieList(){
  this.maladieService.getMaladieList();
  return this.http.get(`${this.baseUrl}/maladies`);
}
// getMaladieList(): Observable<any> {
//   // Retournez l'observable directement
//   return this.maladieService.getMaladieList();
// }
  getZoneList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/zones');
  }


  deleteZone(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/zone/${id}`, { responseType: 'text' });
  }

  getZone(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/zone/${id}`);
  }


  updateZone(id: number, data: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/zone/${id}`, data);
  }

  createZone(zones: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/zone', zones);
  }



  getNumberOfZones(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/zones/count`);
  }
}
