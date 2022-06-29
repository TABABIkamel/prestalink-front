import { Injectable, APP_INITIALIZER } from "@angular/core";
import { KeycloakInstance } from 'keycloak-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Esn} from "../Models/Esn";
import {Router} from "@angular/router";
import {Prestataire} from "../Models/Prestataire";
declare var Keycloak: any;
@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  public kc: KeycloakInstance;
  public isCompleted:boolean=false
  public isEsn:boolean=false;
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}
  constructor(private http: HttpClient,private route:Router) {}
  functionCalledWhenUserIsEsn(res:any){
      if(res) {
        this.isEsn=true
        if (!res?.completed) {
          this.route.navigateByUrl('completeProfile')
        } else {
          this.isCompleted = true
          this.route.navigateByUrl('appeloffre')
        }
      }
  }
  functionCalledWhenUserIsPrestataire(res:any){
    if(!res?.completed){
      this.route.navigateByUrl('completeProfile')
    }else {
      this.isCompleted=true
      this.route.navigateByUrl('appeloffre')

    }
  }
  functionCalledWhenUserIsNotEsn(err:any){
    this.http.get<Prestataire>(`http://localhost:8765/ao-service/api/ao/checkIfProfilePrestataireCompleted/${this.kc.tokenParsed?.preferred_username}`,this.httpOptions)
      .subscribe(res=>{
        this.functionCalledWhenUserIsPrestataire(res)
      },()=>{
        this.functionCalledWhenUserIsNotEsnAndNotPrestataire(err)
      })
  }
  functionCalledWhenUserIsNotEsnAndNotPrestataire(err:any){
    this.route.navigateByUrl('completeProfile')
  }

  public async init() {
    console.log('test if le service est chargé');
    this.kc = new Keycloak({
      url: 'http://host.docker.internal:8090/auth/',
      realm: 'prestalink-realm',
      clientId: 'prestalink-front',
    });
    await this.kc.init({
      onLoad: 'login-required',
      //onLoad: "check-sso",
      //promiseType:"native"
    });
    //console.log(this.kc.token);
    //console.log('token after')

      this.http.get<Esn>(`http://localhost:8765/ao-service/api/ao/checkIfProfileEsnCompleted/${this.kc.tokenParsed?.preferred_username}`, this.httpOptions)
        .subscribe((res) => {
          this.functionCalledWhenUserIsEsn(res)
        }, (err) => {
          if(this.isManager()){
            this.route.navigateByUrl('startScrapping')
            return;
          }
          this.functionCalledWhenUserIsNotEsn(err)
        })


  }
  public getUsernameAuthenticatedUser(){
    return this.kc.tokenParsed?.preferred_username
  }
  public getNameAuthenticatedUser(){
    return this.kc.tokenParsed?.name
  }
  public get_given_name_authenticatedUser(){
    return this.kc.tokenParsed?.given_name
  }
  public get_family_name_authenticatedUser(){
    return this.kc.tokenParsed?.family_name
  }
  public isManager():boolean{
    return this.kc.hasRealmRole('ADMIN')
  }
}
