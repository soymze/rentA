import {
  HttpClientModule,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isUserCreated: boolean = false;

  userObj: any = {
    userName: '',
    mail: '',
    password: '',
  };

  constructor(private http: HttpClient) {}

  onSignUpClick() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  onSignInClick() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }

  onUserCreate(user: { userName: string; mail: string; password: string }) {
    this.isUserCreated = true;
    const header = new HttpHeaders({
      contentType: 'application/json',
    });
    console.log(user);
    this.http
      .post('http://localhost:8080/users/process_register', user, { headers: header })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
