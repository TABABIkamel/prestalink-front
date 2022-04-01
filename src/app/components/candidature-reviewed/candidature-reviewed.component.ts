import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {TableBasicComponent} from "../../componentsNgZorro/table-basic/table-basic.component";

@Component({
  selector: 'app-candidature-reviewed',
  templateUrl: './candidature-reviewed.component.html',
  styleUrls: ['./candidature-reviewed.component.css']
})
export class CandidatureReviewedComponent implements OnInit {
  @ViewChild(TableBasicComponent) dataTable:any;
  isVisible: boolean;
  contentModal:any;
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  inGestionCandidatComponent=false;
  constructor(private appelOffreService:AppelOffreService,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.appelOffreService.getCandidatReviewed(this.keycloakService.getUsernameAuthenticatedUser()).subscribe((res)=>{

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

}
