import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  createSubject(subject) {
    return this.httpClient.post('http://localhost:8080/api/subject/create', subject, {
      headers: this.httpOptions
    })
  }
}
