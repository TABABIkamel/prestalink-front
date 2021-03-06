import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidature} from "../Models/Candidature";
import {Approval} from "../Models/Approval";
import {AppelOffre} from "../Models/AppelOffre";
import {Contrat} from "../Models/Contrat";

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {
  uri:String='http://localhost:8765/ao-service/api/ao/'
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }
  createAo(appelOffre:AppelOffre):Observable<any>{
    return this.http.post(`${this.uri}createAo`,appelOffre,this.httpOptions)
  }
  getAllAo():Observable<any>{
    return this.http.get(`${this.uri}allAo`,this.httpOptions)
  }
  Postuler(candidature:Candidature):Observable<any>{
    return this.http.post(`${this.uri}submit`,candidature,{responseType: 'text'})
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
  generateContract(contrat:Contrat):Observable<any>{
    return this.http.post(`${this.uri}generateContrat`,contrat,{responseType: 'text'})
  }
  getAoByUsernameEsn(username:string):Observable<any>{
    return this.http.get(`${this.uri}getAllAoByUsernameEsn/${username}`)
  }
  deleteAo(idAo:number):Observable<any>{
    return this.http.delete(`${this.uri}deleteAo/${idAo}`,{responseType: 'text'})
  }

  getAoById(idAo:number):Observable<any>{
    return this.http.get(`${this.uri}getAoById/${idAo}`)
  }
  editAo(appelOffre:AppelOffre):Observable<any>{
    return this.http.put(`${this.uri}editAo`,appelOffre)
  }

  getAllContratUrlByUsernameForPrestataire(username:string):Observable<any>{
    return this.http.get(`${this.uri}getAllContratUrlByUsernameForPrestataire/${username}`)
  }
  getAllContratUrlByUsernameForEsn(username:string):Observable<any>{
    return this.http.get(`${this.uri}getAllContratUrlByUsernameForEsn/${username}`)
  }
}
