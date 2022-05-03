import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../services/keycloak.service";
import {AppelOffreService} from "../../services/appel-offre.service";

@Component({
  selector: 'app-view-contrat',
  templateUrl: './view-contrat.component.html',
  styleUrls: ['./view-contrat.component.css']
})
export class ViewContratComponent implements OnInit {
  listOfDataContratAsPrestataire: any;
  listOfDataContratAsEsn: any;
  constructor(private keycloakService:KeycloakService,private appelOffreService:AppelOffreService) {}

  ngOnInit(): void {
    if(this.keycloakService.isEsn){
      this.appelOffreService.getAllContratUrlByUsernameForEsn(this.keycloakService.getUsernameAuthenticatedUser())
        .subscribe(res=>{
          console.log(res)
          this.listOfDataContratAsPrestataire=res.prestataire;
          this.listOfDataContratAsEsn=res.esn
        })
    }else{
      this.appelOffreService.getAllContratUrlByUsernameForPrestataire(this.keycloakService.getUsernameAuthenticatedUser())
        .subscribe(res=>{
          console.log(res)
          this.listOfDataContratAsPrestataire=res;
        })
    }
  }

}
