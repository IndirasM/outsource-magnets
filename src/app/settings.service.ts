import { Injectable } from '@angular/core';
import {
  EmployeesLimits,
  GlobalLimits,
  SetEmployeeLimits,
  SetGlobalLimitRequestModel,
  UserLimits
} from './app.const';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl: string = 'http://localhost:8080/api/';
  private setGlobalLimitUrl: string = 'limit/setGlobal/';
  private employeeLimitUrl: string = 'limit/set/';
  private getGlobalLimitsUrl: string = 'limit/global/';
  private userLimitsUrl: string = 'limit/';
  private employeesLimitsUrl: string = 'limit/staffers/';
  private allEmployeesLimitsUrl: string = 'limit/setBulk/';

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  constructor(private httpClient: HttpClient) {
  }

  getGlobalLimits(): Observable<GlobalLimits> {
    return this.httpClient.get<GlobalLimits>(this.baseUrl + this.getGlobalLimitsUrl, {
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

  changeGlobalLimit(limit: SetGlobalLimitRequestModel): Observable<SetGlobalLimitRequestModel> {
    return this.httpClient.post<SetGlobalLimitRequestModel>(this.baseUrl + this.setGlobalLimitUrl, limit, {
      headers: this.httpOptions
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeEmployeeLimit(employeeLimit: SetEmployeeLimits): Observable<SetEmployeeLimits> {
    return this.httpClient.post<SetEmployeeLimits>(this.baseUrl + this.employeeLimitUrl, employeeLimit, {
      headers: this.httpOptions
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeAllEmployeesLimits(allEmployeesLimits: SetGlobalLimitRequestModel): Observable<SetGlobalLimitRequestModel> {
    return this.httpClient.post<SetGlobalLimitRequestModel>(this.baseUrl + this.allEmployeesLimitsUrl, allEmployeesLimits, {
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



