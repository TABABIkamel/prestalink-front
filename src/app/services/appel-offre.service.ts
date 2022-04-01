import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidature} from "../Models/Candidature";
import {Approval} from "../Models/Approval";
import {AppelOffre} from "../Models/AppelOffre";

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {
  uri:String='http://localhost:8089/api/ao/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }
  createAo(appelOffre:AppelOffre):Observable<any>{
    return this.http.post(`${this.uri}createAo`,appelOffre,this.httpOptions)
  }
  getAllAo():Observable<any>{
    return this.http.get(`${this.uri}allAo`,this.httpOptions)
  }
  Postuler(candidature:Candidature):Observable<Candidature>{
    return this.http.post<Candidature>(`${this.uri}submit`,candidature,this.httpOptions)
  }
  getCandidat(usernameRepresentant:string):Observable<any>{
    return this.http.get<any>(`${this.uri}tasks/${usernameRepresentant}`,this.httpOptions)
  }
  getCandidatReviewed(usernameRepresentant:string):Observable<any>{
    return this.http.get<any>(`${this.uri}finishedTasks/${usernameRepresentant}`,this.httpOptions)
  }
  candidatureReview(approval:Approval):Observable<Approval>{
    return this.http.post<Approval>(`${this.uri}review`,approval,this.httpOptions)
  }
  getCandidatureByUsernameCandidat(usernameCandidat:string):Observable<any>{
    return this.http.get<any>(`${this.uri}getCandidatureByUsernameCandidate/${usernameCandidat}`,this.httpOptions)
  }
}
