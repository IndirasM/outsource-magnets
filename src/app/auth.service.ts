import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn(credentials) {
    return this.httpClient.post('http://localhost:8080/api/user/authenticate', credentials);
  }
}
