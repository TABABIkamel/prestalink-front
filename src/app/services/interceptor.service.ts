import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {KeycloakService} from "./keycloak.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private keycloakService:KeycloakService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor is here !!!")
    if(!this.keycloakService.kc.authenticated)
      return next.handle(req)
    let request=req.clone({
      setHeaders:{
        'Access-Control-Allow-Origin':'http://localhost:8765',
        Authorization:'Bearer '+this.keycloakService.kc.token
      }
    })
    return next.handle(request);
  }


}
