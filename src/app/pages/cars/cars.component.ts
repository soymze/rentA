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


@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [FormsModule, NgbDatepickerModule, JsonPipe, HttpClientModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit{

  httpClient = inject(HttpClient);
  data: any = [];
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    let params = new HttpParams();
    if (this.fromDate) {
      params = params.set('startDate', this.formatter.format(this.fromDate));
    }
    if (this.toDate) {
      params = params.set('endDate', this.formatter.format(this.toDate));
    }


    this.httpClient.get('http://localhost:8080/api/cars/getall',{params}).subscribe((data: any)=>{
      console.log(data);
      this.data = data;
    })
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
