import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;

  ngOnInit() {
    this.isLoggedIn = false;
  }

  logIn() {
    this.isLoggedIn = true;
  }
}
