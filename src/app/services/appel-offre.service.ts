import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {
  uri:String='http://localhost:8089/api/ao/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getAllAo():Observable<any>{
    return this.http.get(`${this.uri}allAo`,this.httpOptions)
  }
}
