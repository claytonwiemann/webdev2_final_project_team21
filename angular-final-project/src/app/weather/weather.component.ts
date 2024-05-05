import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData: any;
  temperatureFahrenheit: number = 0;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //default to new york
    this.weatherService.setCoordinates(40.7128, -74.0060)
    this.weatherService.fetchWeatherByCoordinates(this.weatherService.getLatitude(), this.weatherService.getLongitude())
    .subscribe(data => {
      this.weatherData = data;
      this.temperatureFahrenheit = this.kelvinToFahrenheit(this.weatherData.main.temp);
    });
  }

  getWeatherData(form: NgForm) {
    this.weatherService.setCoordinates(form.value.latitude, form.value.longitude);
    this.weatherService.fetchWeatherByCoordinates(this.weatherService.getLatitude(), this.weatherService.getLongitude())
      .subscribe(data => {
        this.weatherData = data;
        this.temperatureFahrenheit = this.kelvinToFahrenheit(this.weatherData.main.temp);
      });
  }

  kelvinToFahrenheit(kelvin: number): number {
    return Math.trunc((kelvin - 273.15) * 9/5 + 32);
  }

}
