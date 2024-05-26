import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  isFormSubmited: boolean = false;

  contactObj: any = {
    senderMail: '',
    senderName: '',
    subject: '',
    message: '',
  };

  constructor(private http: HttpClient) {}

  onMessageCreate(data: {
    senderName: string;
    senderMail: string;
    subject: string;
    message: string;
  }) {
    this.isFormSubmited = true;
    const header = new HttpHeaders({
      contentType: 'application/json',
    });
    console.log(data);
    this.http
      .post('http://localhost:8080/api/messages', data, { headers: header })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
