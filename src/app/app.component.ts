import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    if(sessionStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logIn(credentials) {
    if(credentials.username && credentials.password) {
      this.authService.logIn(credentials).subscribe((data: any) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('user', data.token);
      });
    }
  }

  logOut() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('user');
    location.reload();
  }
}
