import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeatherByCoordinates(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}`);
  }
}
