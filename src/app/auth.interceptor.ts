import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { InterceptorService } from './interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private interceptorService: InterceptorService, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err.status >= 400) {
          this.interceptorService.logout$.next();
          this.snackBar.open(err.error.message, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-background']
          });
        }
        return of(err);
      })
    )
  }
}
