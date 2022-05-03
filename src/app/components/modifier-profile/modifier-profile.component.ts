import { Component, OnInit } from '@angular/core';
import {Prestataire} from "../../Models/Prestataire";
import {KeycloakService} from "../../services/keycloak.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompleteProfileService} from "../../services/complete-profile.service";
import {Esn} from "../../Models/Esn";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.css']
})
export class ModifierProfileComponent implements OnInit {

  constructor(public keycloak:KeycloakService,
              private completeProfileService:CompleteProfileService,
              private activatedRoute:ActivatedRoute,
              private route:Router,
              private toastr: ToastrService) { }
  prestataire:Prestataire=new Prestataire();
  esn:Esn=new Esn();
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(res=> {
        if(this.keycloak.isEsn){
          this.completeProfileService.getEsnByUsername(res.get('username'))
            .subscribe(res => {
              this.esn = res;
              console.log(res)
            })
        }else {
        this.completeProfileService.getPrestataireByUsername(res.get('username'))
          .subscribe(res => {
            this.prestataire = res;
            console.log(res)
          })
        }
      })
  }

  modifierEsnProfile():void {
    this.completeProfileService.modifierProfileEsn(this.esn)
      .subscribe(()=>{
        this.toastr.success("","votre compte a été modifié")
      },()=>{
        this.toastr.error("","une erreur s'est produite")
      })
  }

  modifierPrestataireProfile():void{
    this.completeProfileService.modifierProfilePrestataire(this.prestataire)
      .subscribe(()=>{
        this.toastr.success("","votre compte a été modifié")
      },()=>{
        this.toastr.error("","une erreur s'est produite")
      })
  }
}
