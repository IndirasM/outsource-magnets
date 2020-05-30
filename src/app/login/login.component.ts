import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCredentials } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() login = new EventEmitter();
  user = new UserCredentials();

  logIn() {
    this.login.emit(this.user);
  }
}
