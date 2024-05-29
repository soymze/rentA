import { Component, OnInit, inject } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    FormsModule,
    NgbDatepickerModule,
    JsonPipe,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule
  ],
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


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    let params = new HttpParams();
    if (this.fromDate) {
      params = params.set('startDate', this.formatter.format(this.fromDate));
    }
    if (this.toDate) {
      params = params.set('endDate', this.formatter.format(this.toDate));
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
  }

  onFilterChange() {
    console.log("Filters changed");
    this.fetchData();
  }

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(
    this.calendar.getToday(),
    'd',
    10
  );

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
