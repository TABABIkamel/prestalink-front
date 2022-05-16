import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from '@angular/common'
import {MoadalBasicComponent} from "../../componentsNgZorro/moadal-basic/moadal-basic.component";
import {TestService} from "../../services/test.service";
import {Candidature} from "../../Models/Candidature";
import {KeycloakService} from "../../services/keycloak.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {Esn} from "../../Models/Esn";
import {AppelOffre} from "../../Models/AppelOffre";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpRequestService} from "../../services/http-request.service";

@Component({
  selector: 'app-appeloffre',
  templateUrl: './appeloffre.component.html'
})
export class AppeloffreComponent implements OnInit {
  @ViewChild(MoadalBasicComponent) modal: MoadalBasicComponent;
  private showSpinnerSubscription: Subscription;
  public pendingHttpRequests:number=0;
  loading = true
  isVisible = false;
  isPostuled: boolean = true;
  isProprietaire:boolean=false;
  appelOffres: AppelOffre[]
  page: number = 1;
  idPost: any;
  appelOffresLength: number;
  candidature: Candidature = new Candidature();
  ModalDescriptionIsVisible: boolean = false;
  contentTitre: string;
  descriptionContent: string;
  appelOffreNotFound:boolean=false;

  constructor(private modalService: NzModalService,
              private appelOffreService: AppelOffreService,
              private toastr: ToastrService,
              public keycloakService: KeycloakService,
              private route:Router,
              private message: NzMessageService,
              private httpRequestTrackingService: HttpRequestService,
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
    this.appelOffreService.getAllAo().subscribe((res) => {
      console.log(res)
      let pipes = new DatePipe('fr_FR');
      res.dateDebutAoDto = pipes.transform(res.dateDebutAoDto, 'yyyy-MM-dd')
      this.appelOffres = res
      console.log()
      this.appelOffres.map(ao => {
        if(this.keycloakService.getUsernameAuthenticatedUser()==ao.esnUsernameRepresentant){
          ao.isProprietaire=true
        }else{
          ao.isProprietaire=false
        }
      })

      if (this.keycloakService.isEsn) {
        console.log(this.appelOffres[0].usernameEsns)
        this.appelOffres.map(ao => {
          ao.isPostuled = ao.usernameEsns.includes(this.keycloakService.getUsernameAuthenticatedUser());
          console.log(ao.isPostuled)
        })
      } else {
        this.appelOffres.map(ao => {
          ao.isPostuled = ao.usernamePrestataires.includes(this.keycloakService.getUsernameAuthenticatedUser());
          console.log(ao.isPostuled)
        })
      }

      this.appelOffresLength = this.appelOffres.length;
    }, (err) => {
      if(err.status=404) {
        this.appelOffreNotFound = true;
        this.toastr.info('', "aucune appel trouvée");
      }
        else
          this.toastr.error("OUPS","error was occurred")
    })
  }

  // showDatail(description:string,titrePoste:string) {
  //   this.modal.modalTitle=titrePoste
  //   this.modal.content=description
  //   this.modal.showModal();
  //
  // }
  postuler = () => {
    this.candidature.idPost = this.idPost;
    this.candidature.username = this.keycloakService.getUsernameAuthenticatedUser();
    this.candidature.name = this.keycloakService.getNameAuthenticatedUser();
    console.log(this.candidature);
    this.appelOffreService.Postuler(this.candidature).subscribe(
      (res) => {
      console.log(res)
        this.toastr.success("congratulation","vous avez postulé à cette appel offre avec success")
        // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.route.onSameUrlNavigation = 'reload';
        this.ngOnInit();
      },
      (error => console.log(error)))
    this.isVisible = false;

  }



  handleCancel() {
    this.isVisible = false;
  }

  handleCancelModalDescription() {
    this.ModalDescriptionIsVisible = false;
  }

  showApplyModal(id: number, isPostuled: boolean,isProprietaire:boolean) {
    if(isPostuled)
      this.message.info('vous avez déjà postuler à cette offre')
    else if(isProprietaire)
      this.message.info('vous êtes le propriétaire de cette offre, vous ne pouvez pas postuler')
    else{
      console.log(isPostuled)
      this.isPostuled = isPostuled
      this.isProprietaire=isProprietaire
      this.idPost = id;
      this.isVisible = true;
      this.modalService.confirm({
        nzOkText: 'oui',
        nzCancelText:'non',
        nzTitle: '<i>voulez-vous postuler à cet appel offre ?</i>',
       // nzContent: '<b>Some descriptions</b>',
        nzOnOk: () => {this.postuler()}
      });
    }


  }

  showDescription(titre: string, description: string) {
    this.contentTitre = titre
    this.descriptionContent = description
    this.ModalDescriptionIsVisible = true;
  }

  handleOkModalDescription() {
    this.ModalDescriptionIsVisible = false
  }
}
