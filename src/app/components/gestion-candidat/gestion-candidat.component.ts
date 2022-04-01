import {Component, OnInit, ViewChild} from '@angular/core';
import {TableBasicComponent} from "../../componentsNgZorro/table-basic/table-basic.component";
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {element} from "protractor";

@Component({
  selector: 'app-gestion-candidat',
  templateUrl: './gestion-candidat.component.html',
  styleUrls: ['./gestion-candidat.component.css']
})
export class GestionCandidatComponent implements OnInit {
@ViewChild(TableBasicComponent) dataTable:any;
  isVisible: boolean;
  contentModal:any;
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  inGestionCandidatComponent=true;
  constructor(private appelOffreService:AppelOffreService,private keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.appelOffreService.getCandidat(this.keycloakService.getUsernameAuthenticatedUser()).subscribe((res)=>{
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
