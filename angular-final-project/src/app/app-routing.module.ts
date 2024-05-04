import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './weather/weather.component';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  { path: 'weather', component: WeatherComponent }, // Weather page route
  { path: 'currency', component: CurrencyComponent }, // Currency page route
  { path: '**', redirectTo: '' } // Redirect to Home page for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
