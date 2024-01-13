import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";

import { environment } from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private authfackservice: AuthfakeauthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes("/login") || request.url.includes("/register")) {
      return next.handle(request); // Skip token handling for login and register requests
    }

    // Get the user token from your authentication service
    //const userToken = "this.authService.getToken()";
    const userToken = sessionStorage.getItem("access");

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
