import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private httpOptions = new HttpHeaders({
    Authorization: "Bearer " + sessionStorage.getItem("user")
  });

  private baseUrl = "http://localhost:8080";

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
}
