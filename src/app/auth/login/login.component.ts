import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    this.http.post<any>('http://localhost:8080/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(res => {

      // 🔥 suponemos backend devuelve JWT
      localStorage.setItem('token', res.token);

      this.router.navigateByUrl('/main');
    });
  }
}
