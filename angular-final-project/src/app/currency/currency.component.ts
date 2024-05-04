import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service'; // Import the CurrencyService

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  exchangeRates: any; // Define a property to hold the exchange rates

  constructor(private currencyService: CurrencyService) { } // Inject the CurrencyService

  ngOnInit(): void {
    // Call the fetchExchangeRates method from the CurrencyService
    this.currencyService.fetchExchangeRates('USD').subscribe(
      (data: any) => {
        this.exchangeRates = data;
      },
      (error: any) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }
}
