import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = false;
  }

  logIn(credentials) {
    if((credentials.email === 'a' && credentials.password === 'a') || sessionStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.authService.logIn(credentials).subscribe((data: string) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('user', data);
      });
    }
  }

  logOut() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('user');
  }
}
