import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrouverProfileService {
  uri:String='http://localhost:8765/profils-service/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getProfilesLinkedIn(num:number,numProfiles:number,keys:any):Observable<any>{
    return this.http.post(`${this.uri}${num}/${numProfiles}`,keys,this.httpOptions)
  }
  getProfileLinkedIn(name:string,lieu:string):Observable<any>{
    return this.http.post(`${this.uri}singleScrap/${name} ${lieu}`,null,{responseType: 'text'})
  }
  getProfileLinkedInScrapper(link:any):Observable<any>{
    return this.http.post(`${this.uri}profile`,link,this.httpOptions)
  }
  startScrapping(critere:string):Observable<any>{
    return this.http.post(`${this.uri}run/${critere}`,null,this.httpOptions)
  }
}
