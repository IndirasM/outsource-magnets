import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCredentials } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter();
  user = new UserCredentials();

  constructor() { }

  ngOnInit(): void {
  }

  logIn() {
    this.login.emit(this.user);
  }
}
