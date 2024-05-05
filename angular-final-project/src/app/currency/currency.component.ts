import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  exchangeRates: any;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    //Call the fetchExchangeRates method from the CurrencyService
    //USD example below
    this.currencyService.setCurrency('USD');
    this.currencyService.getCurrency().subscribe(
      (data: any) => {
        this.exchangeRates = data;
      },
      (error: any) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  getExchangeRates(form: NgForm) {
    this.currencyService.setCurrency(form.value.country);
    this.currencyService.getCurrency().subscribe(
      (data: any) => {
        this.exchangeRates = data;
      },
      (error: any) => {
        console.error('Error fetching exchange rates:', error);
      }
    )
  }
}
