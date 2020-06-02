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

  getLearningDaysBySubject(id) {
    return this.httpClient.get(`http://localhost:8080/api/learningDays/bySubjectId/${id}`, {
      headers: this.httpOptions
    });
  }
}
