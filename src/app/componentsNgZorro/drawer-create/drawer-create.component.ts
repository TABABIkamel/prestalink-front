import {Component, Input} from '@angular/core';
import {Esn} from "../../Models/Esn";
import {AppelOffre} from "../../Models/AppelOffre";
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drawer-create',
  templateUrl: './drawer-create.component.html'
})
export class DrawerCreateComponent {
  appelOffre:AppelOffre=new AppelOffre();
  @Input() nameOfParentComponent:string;
  visible = false;
  dateDebutEtFin: Date[][] = new Array();
  titleDrawer:string;
constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService,private route:Router) {
}
  open(): void {
    this.titleDrawer="ajouter appel offre";
    this.visible = true;

  }

  close(): void {
    this.visible = false;
  }

  submitAo() {
    //this.appelOffre.dateDebutAoDto=this.dateAo[0]
    //this.appelOffre.dateFinAoDto=this.dateAo[1]
    console.log(this.appelOffre)
    if(this.nameOfParentComponent=="mesAppelOffres"){
      this.appelOffre.dateDebutAoDto=this.dateDebutEtFin[0][0]
      this.appelOffre.dateFinAoDto=this.dateDebutEtFin[0][1]
      console.log(this.appelOffre)
      this.appelOffreService.editAo(this.appelOffre)
        .subscribe(res=>{
          this.toastr.success("","appel offre a été modifié")
          this.appelOffre=new AppelOffre();
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigateByUrl('appeloffre')
        })

    }else{
      this.appelOffre.dateDebutAoDto=this.dateDebutEtFin[0][0]
      this.appelOffre.dateFinAoDto=this.dateDebutEtFin[0][1]
    this.appelOffreService.createAo(this.appelOffre).subscribe((res)=>{
      this.appelOffre=new AppelOffre()
      this.dateDebutEtFin=[]
      this.toastr.success("","appel offre a été crée")
      this.appelOffre=new AppelOffre();
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigateByUrl('appeloffre')
    },(error => {
      this.toastr.error("OUPS","error has occurred")
    }))
    }
    this.visible = false;
  }
}
