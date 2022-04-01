import { Component, OnInit } from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-mes-candidature',
  templateUrl: './mes-candidature.component.html',
  styleUrls: ['./mes-candidature.component.css']
})
export class MesCandidatureComponent implements OnInit {
  listOfData: any;

  constructor(private appelOffreService:AppelOffreService,private keycloakService:KeycloakService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.appelOffreService.getCandidatureByUsernameCandidat(this.keycloakService.getUsernameAuthenticatedUser())
      .subscribe(res=>{
        this.listOfData=res
      },error => {
        this.toastr.error("OUPS","Vous n'avez pas postuler à aucune appel offre")
      })
  }

}
