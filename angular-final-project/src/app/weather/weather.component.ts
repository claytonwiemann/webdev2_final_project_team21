import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

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
    //new york example
    const latitude = 40.7128;
    const longitude = -74.0060;
    this.fetchWeatherData(latitude, longitude);
  }

  fetchWeatherData(latitude: number, longitude: number): void {
    this.weatherService.fetchWeatherByCoordinates(latitude, longitude)
      .subscribe(data => {
        this.weatherData = data;
        this.temperatureFahrenheit = this.kelvinToFahrenheit(this.weatherData.main.temp);
      });
  }

  kelvinToFahrenheit(kelvin: number): number {
    return Math.trunc((kelvin - 273.15) * 9/5 + 32);
  }
}
