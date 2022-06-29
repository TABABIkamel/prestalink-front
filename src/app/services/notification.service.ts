import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppelOffre} from "../Models/AppelOffre";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  uri:String='http://localhost:8765/ao-service/api/ao/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }
  getAllNotificationByUsername(username:string):Observable<any>{
    return this.http.get(`${this.uri}getAllNotificationByUsername/${username}`,this.httpOptions)
  }


}
