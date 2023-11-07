import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/keneya';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Récupérer l'utilisateur actuel depuis le localStorage lors de l'initialisation du service
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.setCurrentUser(JSON.parse(storedUser));
    }
  }

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    // Stocker l'ID de l'utilisateur dans le localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

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
    // Utiliser pipe pour manipuler la réponse
    return this.http.post(`${this.baseUrl}/login`, body).pipe(
      tap((user: any) => {
        // Mettre à jour l'utilisateur actuel après la connexion réussie
        this.setCurrentUser(user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
