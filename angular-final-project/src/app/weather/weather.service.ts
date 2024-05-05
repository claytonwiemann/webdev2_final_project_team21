import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private latitude = 0;
  private longitude = 0;

  fetchWeatherByCoordinates(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/weather?lat=${this.latitude}&lon=${this.longitude}`);
  }

  setCoordinates(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getWeatherData() {
    return this.http.get<any>(`http://localhost:3000/weather?lat=${this.latitude}&lon=${this.longitude}`);
  }

  ngOnInit() {
    return this.http.get<any>(`http://localhost:3000/weather?lat=${this.latitude}&lon=${this.longitude}`);
  }

  ngOnDestroy() {

  }
}
