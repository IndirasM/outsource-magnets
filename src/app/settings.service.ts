import { Injectable } from '@angular/core';
import { EmployeesLimits, GlobalLimits, Limit, UserLimits} from './app.const';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl: string = 'http://localhost:8080/api/';
  private limitUrl: string = 'limit/';
  private employeeLimitUrl: string = 'employeeLimit/';
  private globalLimitsUrl: string = 'globalLimit/';
  private userLimitsUrl: string = 'userLimit/';
  private employeesLimitsUrl: string = 'employeesLimits/';

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient) {
  }

  getGlobalLimits(): Observable<GlobalLimits> {
    return this.httpClient.get<GlobalLimits>(this.baseUrl + this.globalLimitsUrl, {
      headers: this.httpOptions
    });
  }

  getUserLimits(): Observable<UserLimits> {
    return this.httpClient.get<UserLimits>(this.baseUrl + this.userLimitsUrl, {
      headers: this.httpOptions
    });
  }

  getEmployeesLimits(): Observable<EmployeesLimits[]> {
    return this.httpClient.get<EmployeesLimits[]>(this.baseUrl + this.employeesLimitsUrl, {
      headers: this.httpOptions
    });
  }

  changeLimit(limit: Limit): Observable<Limit> {
    return this.httpClient.post<Limit>(this.baseUrl + this.limitUrl, limit, {
      headers: this.httpOptions
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeEmployeeLimit(employeeLimit: EmployeesLimits): Observable<EmployeesLimits> {
    return this.httpClient.post<EmployeesLimits>(this.baseUrl + this.employeeLimitUrl, employeeLimit, {
      headers: this.httpOptions
    })
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
}


