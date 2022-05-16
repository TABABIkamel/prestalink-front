import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {AppelOffre} from "../../Models/AppelOffre";
import {NzModalService} from "ng-zorro-antd/modal";
import {ToastrService} from "ngx-toastr";
import {DrawerCreateComponent} from "../../componentsNgZorro/drawer-create/drawer-create.component";

@Component({
  selector: 'app-mes-appel-offre',
  templateUrl: './mes-appel-offre.component.html',
  styleUrls: ['./mes-appel-offre.component.css']
})
export class MesAppelOffreComponent implements OnInit {
  @ViewChild(DrawerCreateComponent) drawerCreateComponent:DrawerCreateComponent;
  page: number = 1;
  appelOffresLength: number;
  appelOffres: AppelOffre[];
  ModalDescriptionIsVisible: boolean = false;
  contentTitre: string;
  descriptionContent: string;
  appelOffreNotFound:boolean=false;
  constructor(private appelOffreService: AppelOffreService,
              public keycloakService: KeycloakService,
              private modal: NzModalService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.appelOffreService.getAoByUsernameEsn(this.keycloakService.getUsernameAuthenticatedUser())
      .subscribe(res=>{
        console.log(res);
        this.appelOffres=res;
      },error => {
        if(error.status=404) {
          this.appelOffreNotFound = true;
          this.toastr.info('', "aucune appel trouvée");
        }
        else
          this.toastr.error("OUPS","error was occurred")
        console.log(error)
      })
  }

  showDescription(titre: string, description: string) {
    this.contentTitre = titre
    this.descriptionContent = description
    this.ModalDescriptionIsVisible = true;
  }

  handleCancelModalDescription() {
    this.ModalDescriptionIsVisible = false;
  }
  handleOkModalDescription() {
    this.ModalDescriptionIsVisible = false
  }

  deleteAo(idAo:number) {

    this.modal.confirm({
      nzTitle: 'vous êtes sûr !!',
      //nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.appelOffreService.deleteAo(idAo)
          .subscribe(res=>{
              this.toastr.info("OK","")
          },error => {
            this.toastr.error(error)
          })
      },
      nzCancelText: 'No',
    });

  }

  EditAo(idDto: number) {
    this.appelOffreService.getAoById(idDto)
      .subscribe(res=>{
        console.log(res)
        this.drawerCreateComponent.appelOffre=res;
        this.drawerCreateComponent.dateDebutEtFin.push([res.dateDebutAoDto,res.dateFinAoDto])
          //.push([res.dateDebut,res.dateFin]);
      })
    this.drawerCreateComponent.titleDrawer="modifer appel offre"
    this.drawerCreateComponent.visible=true;

  }
}
