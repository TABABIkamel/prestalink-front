import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {TableBasicComponent} from "../../componentsNgZorro/table-basic/table-basic.component";
import {formatDate} from "@angular/common";
import {Observable} from "rxjs";
import {HttpRequestService} from "../../services/http-request.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-candidature-reviewed',
  templateUrl: './candidature-reviewed.component.html',
  styleUrls: ['./candidature-reviewed.component.css']
})
export class CandidatureReviewedComponent implements OnInit {
  @ViewChild(TableBasicComponent) dataTable:any;
  public showSpinner$: Observable<Boolean>;
  isVisible: boolean;
  contentModal:any;
  show:boolean=false;
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  today:Date= new Date("2002, 02, 02")
  inGestionCandidatComponent=false;
  constructor(private appelOffreService:AppelOffreService,private keycloakService:KeycloakService,httpRequestTrackingService: HttpRequestService) {
    this.showSpinner$ = httpRequestTrackingService.pendingHttpRequests$
      .pipe(map((pendingHttpRequests: number) => {
        return pendingHttpRequests > 0;
      }));

  }

  ngOnInit(): void {
    this.appelOffreService.getCandidatReviewed(this.keycloakService.getUsernameAuthenticatedUser()).subscribe((res)=>{
      console.log(res)
      this.dataTable.listOfData=res;
    })
  }
  getIsVisibleValue(value:boolean){
    this.isVisible=value;
  }

  handleCancel() {
    this.isVisible=false;
  }

  handleOk() {
    this.isVisible=false;
  }

  getIdCandidat(id:number) {
    console.log(id)
    this.dataTable.listOfData.forEach((element:any)=>{
      if(element.id==id){
        this.contentModal=element;
      }
    })
    console.log('heree')
    console.log(this.contentModal)
  }

  reloadComponent(check: boolean) {
    if(check){
      this.ngOnInit()
    }
  }
}
