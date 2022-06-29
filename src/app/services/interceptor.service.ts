import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {KeycloakService} from "./keycloak.service";
import {HttpRequestService} from "./http-request.service";
import {catchError, finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private keycloakService:KeycloakService,private httpRequestTrackingService: HttpRequestService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpRequestTrackingService.requestStarted();
    if(!this.keycloakService.kc.authenticated)
      return next.handle(req)
    let request=req.clone({
      setHeaders:{
        'Access-Control-Allow-Origin':'http://localhost:8765',
        Authorization:'Bearer '+this.keycloakService.kc.token
      }
    })
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),finalize(() => {
        this.httpRequestTrackingService.requestFinished();
      })
    );
  }


}
