import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/login';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Oggetto contenente le credenziali dell'utente
    const credentials = { username, password };
    // Invio delle credenziali al server e gestione della risposta
    return this.http.post(this.loginUrl, credentials).pipe(
      catchError((error) => {
        // Gestisci qui l'errore, ad esempio trasformandolo in un Observable
        return throwError(() => new Error('Username o password non validi'));
      })
    );
  }

  register(email: string, password: string): boolean {
    // Simula la registrazione dell'utente
    return true;
  }
}
