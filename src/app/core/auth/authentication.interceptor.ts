import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes("login")) {
      const accessToken = this.authService.getToken();

      const headers = request.headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );

      const authReq = request.clone({ headers });

      return next.handle(authReq)
    } else {
      return next.handle(request);
    }
  }
}