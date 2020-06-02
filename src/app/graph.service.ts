import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SuggestedSubjects} from "./main-container/add-training/add-training.component";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  private baseUrl = 'http://localhost:8080';
  private suggestSubjectUrl = '/api/employeeSubject/add/';
  private getSuggestedSubjectsUrl = '/api/subject/allSuggestedSubjects';

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

  addSuggestedSubjects(subjectId: string, employees: number[]) {
    return this.httpClient.post<number[]>(this.baseUrl + this.suggestSubjectUrl + subjectId, {employeeIds: employees} , {
      headers: this.httpOptions
    });
  }

  fetchSuggestedSubjects(): Observable<SuggestedSubjects[]> {
    return this.httpClient.get<SuggestedSubjects[]>(this.baseUrl + this.getSuggestedSubjectsUrl, {
      headers: this.httpOptions
    });
  }

}
