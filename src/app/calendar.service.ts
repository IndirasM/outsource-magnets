import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { EmployeesLearningDays, LearningDays } from './app.const';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl: string = 'http://localhost:8080/api/';
  private employeeLearningDaysUrl: string = 'learningDays/staffers/'; // http://localhost:8080/api/learningDays/staffers
  private learningDaysUrl: string = 'learningDays/'; // http://localhost:8080/api/learningDays

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  constructor(private httpClient: HttpClient) {}

  getLearningDays(): Observable<LearningDays[]> {
    return this.httpClient.get<LearningDays[]>(this.baseUrl + this.learningDaysUrl, {
      headers: this.httpOptions
    });
  }

  getEmployeeLearningDays(): Observable<EmployeesLearningDays[]> {
    return this.httpClient.get<EmployeesLearningDays[]>(this.baseUrl + this.employeeLearningDaysUrl, {
      headers: this.httpOptions
    });
  }

  deleteLearningDay(id: number): Observable<{}> {
    return this.httpClient.delete(this.baseUrl + this.learningDaysUrl + id, {
      headers: this.httpOptions})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  addLearningDay(formData) {
    console.log(formData);
    return this.httpClient.post(this.baseUrl + 'learningDays', {
      date: new Date(formData.training.date).toISOString().substring(0,10),
      subjectId: formData.training.subject.id
    }, {
      headers: this.httpOptions
    })
  }

}
