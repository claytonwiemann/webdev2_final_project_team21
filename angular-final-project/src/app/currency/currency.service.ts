import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  fetchExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/exchange-rates/${baseCurrency}`);
  }
}