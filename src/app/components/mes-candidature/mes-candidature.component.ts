import { Component, OnInit } from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {HttpRequestService} from "../../services/http-request.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-mes-candidature',
  templateUrl: './mes-candidature.component.html',
  styleUrls: ['./mes-candidature.component.css']
})
export class MesCandidatureComponent implements OnInit {
  private showSpinnerSubscription: Subscription;
  public pendingHttpRequests:number=0;
  listOfData: any;
  constructor(private appelOffreService:AppelOffreService,
              private keycloakService:KeycloakService,
              private toastr: ToastrService,
              httpRequestTrackingService: HttpRequestService,
              private spinner: NgxSpinnerService) {
    this.showSpinnerSubscription = httpRequestTrackingService.pendingHttpRequests$.subscribe((value)=>{
      this.pendingHttpRequests=value;
      if(this.pendingHttpRequests>0)
        this.spinner.show()
      else
        this.spinner.hide()
    })
  }

  ngOnInit(): void {
    this.appelOffreService.getCandidatureByUsernameCandidat(this.keycloakService.getUsernameAuthenticatedUser())
      .subscribe(res=>{
        console.log(res)
        this.listOfData=res

      },error => {
        this.toastr.info("info","vous n'avez pas postulé à aucun appel offre")
      })
  }

}
