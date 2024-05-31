import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    DatePipe
  ],
  providers: [DatePipe], 
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit {
  type: string = '';
  fuel: string = '';
  brand: string = '';
  year: number = 2000;
  httpClient = inject(HttpClient);
  data: any = [];
  p: number = 1;
  totalProduct: any;

  fromDate: string = '';
  toDate: string = ''; 
  constructor(private reservationService: ReservationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  this.fromDate = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
  this.toDate = this.datePipe.transform(tenDaysLater, 'yyyy-MM-dd') || '';
    this.fetchData();
  }

  fetchData() {
    let params = new HttpParams();
    if (this.fromDate) {
      params = params.set('startDate', this.fromDate);
    }
    if (this.toDate) {
      params = params.set('endDate', this.toDate);
    }
    if (this.brand && this.brand !== 'default') {
      params = params.set('brand', this.brand);
    }
    if (this.type && this.type !== 'default') {
      params = params.set('type', this.type);
    }
    if (this.fuel && this.fuel !== 'default') {
      params = params.set('fuel', this.fuel);
    }
    if (this.year && this.year !== 2000) {
      params = params.set('year', this.year.toString());
    }

    this.httpClient
      .get('http://localhost:8080/api/cars/getall', { params })
      .subscribe((data: any) => {
        this.data = data;
        this.totalProduct = data.length;
      });
      this.reservationService.setFromDate(this.fromDate ? new Date(this.fromDate) : null);
    this.reservationService.setToDate(this.toDate ? new Date(this.toDate) : null); 
  }

  onFilterChange() {
    console.log("Filters changed");
    this.fetchData();
  }
}
