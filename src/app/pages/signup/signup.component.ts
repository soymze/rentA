import { HttpClientModule, HttpHeaders , HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private http: HttpClient){

  }

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

  onUserCreate(user: {userName: string, mail: string, password: string}) {
    const header = new HttpHeaders({
      contentType: 'application/json'
    })
    console.log(user);
    this.http.post('http://localhost:8080/api/users', user, {headers: header}).subscribe((res) => {
      console.log(res);
    });
  }
}
