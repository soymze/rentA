import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JsonPipe, DatePipe } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule,JsonPipe, DatePipe, NgbAlertModule],
  providers: [DatePipe], 
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit{
  @ViewChild('successAlert') successAlert!: NgbAlert;
  @ViewChild('errorAlert') errorAlert!: NgbAlert;

  selectedFromDate: Date | null = null;
  selectedToDate: Date | null = null;
  carId: number = 0;
  carDetail: any;
  reservationSuccess: boolean = false;
  reservationError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private reservationService: ReservationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.reservationService.fromDate$.subscribe(date => this.selectedFromDate = date);
    this.reservationService.toDate$.subscribe(date => this.selectedToDate = date);
    if (id) {
      this.carId = +id;
      this.getCarDetail();
    } else {
      console.error('No car ID in route');
    }
    setTimeout(() => {
			if (this.successAlert || this.errorAlert) {
				this.successAlert.close();
        this.errorAlert.close();
			}
		}, 5000);
  }

  onReserveClick() {
    // Check if dates are selected
    if (this.selectedFromDate && this.selectedToDate) {
      // Prepare the reservation request body
      const reservationRequest = {
        carId: this.carId,
        startDate: this.selectedFromDate,
        endDate: this.selectedToDate
      };

      // Send reservation request to backend
      this.httpClient.post<any>('http://localhost:8080/api/reservations/reserve', reservationRequest)
        .subscribe({
          next: () => {
            console.log('Reservation request sent successfully');
            this.reservationSuccess = true;
            this.reservationError = false;
            // Handle success response, e.g., show success message to user
          },
          error: (error) => {
            console.error('Error sending reservation request:', error);
            this.reservationSuccess = false;
            this.reservationError = true;
            // Handle error response, e.g., show error message to user
          }
        });
    } else {
      console.error('Please select both start and end dates for reservation');
      // Show error message to user indicating that both start and end dates must be selected
    }
  }

  getCarDetail() {
    this.httpClient.get(`http://localhost:8080/api/cars/getbyid/${this.carId}`).subscribe(
      (data: any) => {
        if (data && data.success && data.data) {
          this.carDetail = data.data;
          console.log(this.carDetail);
        } else {
          console.error('Error fetching car detail: Invalid response format');
        }
      },
      (error: any) => {
        console.error('Error fetching car detail', error);
      }
    );
  }


}
