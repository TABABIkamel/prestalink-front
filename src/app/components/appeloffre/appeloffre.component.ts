import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import { DatePipe } from '@angular/common'
import {MoadalBasicComponent} from "../../componentsNgZorro/moadal-basic/moadal-basic.component";
import {TestService} from "../../services/test.service";
import {Candidature} from "../../Models/Candidature";
import {KeycloakService} from "../../services/keycloak.service";
import {NzModalService} from "ng-zorro-antd/modal";
@Component({
  selector: 'app-appeloffre',
  templateUrl: './appeloffre.component.html'
})
export class AppeloffreComponent implements OnInit{
  @ViewChild(MoadalBasicComponent) modal: MoadalBasicComponent;
  loading=true
  isVisible=false;
  appelOffres:any
  page:number=1;
  idPost:any;
  appelOffresLength:number;
  candidature:Candidature=new Candidature();
  content=`vous voulez vraiment postuler à cette offre`;
  constructor(private modalService: NzModalService,private appelOffreService:AppelOffreService,private toastr: ToastrService,public keycloakService:KeycloakService) { }

  ngOnInit(): void {
    this.appelOffreService.getAllAo().subscribe((res)=>{
      console.log(res)
      let pipes = new DatePipe('en-US');
      res.dateDebutAoDto =pipes.transform(res.dateDebutAoDto, 'yyyy-MM-dd')
      this.appelOffres=res
      this.appelOffresLength=this.appelOffres.length;
    },(err)=>{this.toastr.error('Oups!', 'error was occurred ');})
  }

  // showDatail(description:string,titrePoste:string) {
  //   this.modal.modalTitle=titrePoste
  //   this.modal.content=description
  //   this.modal.showModal();
  //
  // }
   postuler=()=>{
    this.candidature.idPost=this.idPost;
    this.candidature.username=this.keycloakService.getUsernameAuthenticatedUser();
    this.candidature.name=this.keycloakService.getNameAuthenticatedUser();
    console.log(this.candidature);
    this.appelOffreService.Postuler(this.candidature).subscribe((res)=>console.log(res),(error => console.log(error)))
     this.isVisible=false;

  }
  ModalDescriptionIsVisible: boolean=false;
  contentTitre: string;
  descriptionContent: string;


  handleCancel() {
    this.isVisible=false;
  }
  handleCancelModalDescription() {
    this.ModalDescriptionIsVisible=false;
  }

  showApplyModal(id:any) {
    this.idPost=id;
    console.log(this.idPost)
    this.isVisible=true;
  }

  showDescription(titre:string,description:string) {
    this.contentTitre=titre
    this.descriptionContent=description
    this.ModalDescriptionIsVisible=true;
  }

  handleOkModalDescription() {
    this.ModalDescriptionIsVisible=false
  }
}
