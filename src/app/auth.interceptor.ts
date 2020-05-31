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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private interceptorService: InterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err.status != 404 && err.status >= 400) {
          this.interceptorService.logout$.next();
        }
        return of(err);
      })
    )
  }
}
