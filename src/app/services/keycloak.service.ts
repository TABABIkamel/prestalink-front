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
        console.log('in if 1')
        if (!res?.completed) {
          this.route.navigateByUrl('completeProfile')
          console.log('in if 2')
        } else {
          this.isCompleted = true
          this.route.navigateByUrl('appeloffre')
        }
      }
  }
  functionCalledWhenUserIsPrestataire(res:any){
    console.log('in else 1')
    if(!res?.completed){
      console.log(res)
      console.log('in else 2')
      this.route.navigateByUrl('completeProfile')
    }else {
      this.isCompleted=true
      this.route.navigateByUrl('appeloffre')

    }
  }
  functionCalledWhenUserIsNotEsn(err:any){
    console.log('in error')
    this.http.get<Prestataire>(`http://localhost:8089/api/ao/checkIfProfilePrestataireCompleted/${this.kc.tokenParsed?.preferred_username}`,this.httpOptions)
      .subscribe(res=>{
        this.functionCalledWhenUserIsPrestataire(res)
      },()=>{
        this.functionCalledWhenUserIsNotEsnAndNotPrestataire(err)
      })
  }
  functionCalledWhenUserIsNotEsnAndNotPrestataire(err:any){
    console.log('in error prestataire')
    this.route.navigateByUrl('completeProfile')
  }

  public async init() {
    console.log('test if le service est chargé');
    this.kc = new Keycloak({
      url: 'http://localhost:8090/auth/',
      realm: 'prestalink-realm',
      clientId: 'prestalink-front',
    });
    await this.kc.init({
      //onLoad: 'login-required',
      onLoad :"check-sso",
      //promiseType:"native"
    });
    console.log(this.kc.token);
    console.log('token after')
    console.log(this.kc.tokenParsed?.preferred_username)
    this.http.get<Esn>(`http://localhost:8089/api/ao/checkIfProfileEsnCompleted/${this.kc.tokenParsed?.preferred_username}`,this.httpOptions)
      .subscribe((res)=>{this.functionCalledWhenUserIsEsn(res)},(err)=>{this.functionCalledWhenUserIsNotEsn(err)})
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
  // public getSuppliers(){
  //   return this.http.get("http://localhost:8083/suppliers")
  // }
  public isManager():boolean{
    return this.kc.hasResourceRole("ADMIN")
  }
}
