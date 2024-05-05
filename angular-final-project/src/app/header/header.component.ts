import { Component, OnInit } from '@angular/core';
import { RequestCountService } from './header.service';
import { response } from 'express';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalRequests: number = 0;

  constructor(private requestCountService: RequestCountService) { }

  ngOnInit(): void {
    this.fetchTotalRequestsCount();
  }
  //displaying the total number of requests for the day
  fetchTotalRequestsCount(): void {
    this.requestCountService.fetchTotalRequestsCount().subscribe(
      (response: any) => {
        this.totalRequests = response.totalRequests;
      },
      error => {
        console.error('Error fetching total requests:', error);
      }
    );
  }


}
