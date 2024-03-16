import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/prodotto.module';


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  private apiUrl = 'http://localhost:3000/prodotti';

  constructor(private http: HttpClient) { }

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${this.apiUrl}`);
  }

  aggiungiProdotto(prodotto: any): Observable<any> {
    return this.http.post(this.apiUrl, prodotto);
  }

  deleteProdotto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  

}
