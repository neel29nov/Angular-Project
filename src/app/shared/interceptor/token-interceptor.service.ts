import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = "http://smegroup.org/client/adminBook/";
    req = req.clone({
      url : baseUrl + req.url
    })
    if (localStorage.getItem('authToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
      });
    }
    return next.handle(req);
  }
}
