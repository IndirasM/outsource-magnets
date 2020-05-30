import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { InterceptorService } from './interceptor.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private interceptorService: InterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
        if(event instanceof HttpResponse && event.status / 100 > 3) {
          this.interceptorService.logout$.next();
        }
        return event;
      })
    )
  }
}
