import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule,JsonPipe],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit{
  carId: number = 0;
  carDetail: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carId = +id;
      this.getCarDetail();
    } else {
      console.error('No car ID in route');
    }
  }

  getCarDetail() {
    this.httpClient.get(`http://localhost:8080/api/cars/getbyid/${this.carId}`).subscribe(
      (data: any) => {
        if (data && data.success && data.data) {
          this.carDetail = data.data;
          console.log(this.carDetail); // Veriyi kontrol etmek için
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
