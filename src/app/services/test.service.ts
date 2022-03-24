import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  userPostUrl:string='http://localhost:8090/auth'
  public tokenadmin(): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        username: "kamel",
        password: "12345",
        grant_type: "password",
        client_id: "admin-cli",
      },
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    console.log(params);
    return this.http
      .post(
        `${this.userPostUrl}/realms/master/protocol/openid-connect/token`,
        params.toString(),
        httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.access_token;
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
