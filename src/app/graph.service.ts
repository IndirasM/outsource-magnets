import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SetEmployeeSuggestedSubject, SetEmployeeLimits} from "./app.const";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  private baseUrl = 'http://localhost:8080';
  private suggestSubjectUrl = '/api/subject/suggest/';

  constructor(private httpClient: HttpClient) { }

  fetchTraining(id) {
    return this.httpClient.get(`${this.baseUrl}/api/subject/${id}`, {
      headers: this.httpOptions
    });
  }

  fetchAllTrainings() {
    return this.httpClient.get(`${this.baseUrl}/api/subject/all`, {
      headers: this.httpOptions
    });
  }

  addSuggestedSubjects(subjectId: string, employees: SetEmployeeSuggestedSubject[]) {
    return this.httpClient.post<SetEmployeeSuggestedSubject[]>(this.baseUrl + this.suggestSubjectUrl + subjectId, employees, {
      headers: this.httpOptions
    });
  }

}
