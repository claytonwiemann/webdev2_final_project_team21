import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestCountService {
  constructor(private http: HttpClient) {}

  // Method to fetch the total number of requests
  fetchTotalRequestsCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3000/total-requests');
  }
}
