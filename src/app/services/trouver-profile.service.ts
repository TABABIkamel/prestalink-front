import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrouverProfileService {
  uri:String='http://localhost:5000/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getProfilesLinkedIn(num:number,keys:any):Observable<any>{
    return this.http.post(`${this.uri}${num}`,keys,this.httpOptions)
  }
  getProfileLinkedIn(name:string):Observable<any>{
    return this.http.post(`${this.uri}singleScrap/${name}`,null,{responseType: 'text'})
  }
  getProfileLinkedInScrapper(link:any):Observable<any>{
    return this.http.post(`${this.uri}profile`,link,this.httpOptions)
  }
}
