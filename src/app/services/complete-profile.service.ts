import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
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
    return this.http.post<Esn>(`${this.uri}completeProfileEsn`,esn,{
      reportProgress: true,
      responseType: 'json'
    })
  }
  completeProfilePrestataire(prestataire:Prestataire):Observable<any>{
    return this.http.post<Prestataire>(`${this.uri}completeProfilePrestataire`,prestataire,this.httpOptions)
  }

  uploadPhotoToEsn(file: File,username:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.uri}setPhotoToEsn/${username}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  uploadPhotoToPrestataire(file: File,username:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.uri}setPhotoToPrestataire/${username}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getPrestataireByUsername(username:String|null):Observable<Prestataire>{
    return this.http.get<Prestataire>(`${this.uri}getPrestataireByUsername/${username}`,this.httpOptions)
  }
  getEsnByUsername(username:String|null):Observable<Esn>{
    return this.http.get<Esn>(`${this.uri}getEsnByUsername/${username}`,this.httpOptions)
  }

  modifierCvPrestataire(prestataire:Prestataire):Observable<any>{
    return this.http.put<any>(`${this.uri}modifCvPrestataire`,prestataire,this.httpOptions)
  }
  modifierProfilePrestataire(prestataire:Prestataire):Observable<any>{
    return this.http.put(`${this.uri}modifierProfilPrestataire`,prestataire,{responseType: 'text'})
  }
  modifierProfileEsn(esn:Esn):Observable<any>{
    return this.http.put(`${this.uri}modifierProfilEsn`,esn,{responseType: 'text'})
  }
  getPrestataireWithHisCvByUsername(username:String|null):Observable<Prestataire>{
    return this.http.get<Prestataire>(`${this.uri}getPrestataireWithHisCvByUsername/${username}`,this.httpOptions)
  }
}
