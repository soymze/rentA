// src/app/services/reservation.service.ts

import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private fromDateSubject = new BehaviorSubject<Date | null>(null);
  private toDateSubject = new BehaviorSubject<Date | null>(null);

  get fromDate$() {
    return this.fromDateSubject.asObservable();
  }

  get toDate$() {
    return this.toDateSubject.asObservable();
  }

  setFromDate(date: Date | null): void {
    this.fromDateSubject.next(date);
  }

  setToDate(date: Date | null): void {
    this.toDateSubject.next(date);
  }
}
