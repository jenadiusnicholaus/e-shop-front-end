import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthService } from './auth.service'; // Replace with your authentication service

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {} // Inject your authentication service

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL is for login or register
    if (
      request.url.includes('/login/') ||
      request.url.includes('/register/')
    ) {
      return next.handle(request); // Skip token handling for login and register requests
    }

    // Get the user token from your authentication service
    const userToken = ''

    // Clone the request and add the token to the Authorization header
    if (userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
