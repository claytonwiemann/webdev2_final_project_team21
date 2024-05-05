import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CurrencyService implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {}

  private baseCurrency = '';

  setCurrency(baseCurrency: string) {
    this.baseCurrency = baseCurrency;
  }

  getCurrency() {
    return this.http.get<any>(`http://localhost:3000/exchange-rates/${this.baseCurrency}`);
  }

  ngOnInit() {
    return this.http.get<any>(`http://localhost:3000/exchange-rates/${this.baseCurrency}`);
  }
  ngOnDestroy() {

  }
}
