import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Esn} from "../Models/Esn";
import {Prestataire} from "../Models/Prestataire";

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileService {
  uri:String='http://localhost:8089/api/ao/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  completeProfileEsn(esn:Esn):Observable<any>{
    return this.http.post<Esn>(`${this.uri}completeProfileEsn`,esn,this.httpOptions)
  }
  completeProfilePrestataire(prestataire:Prestataire):Observable<any>{
    return this.http.post<Prestataire>(`${this.uri}completeProfilePrestataire`,prestataire,this.httpOptions)
  }
}
