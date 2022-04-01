import { Component } from '@angular/core';
import {Esn} from "../../Models/Esn";
import {AppelOffre} from "../../Models/AppelOffre";
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-drawer-create',
  templateUrl: './drawer-create.component.html'
})
export class DrawerCreateComponent {
  appelOffre:AppelOffre=new AppelOffre();
  visible = false;
  dateAo: Date[];
constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService) {
}
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitAo() {
    this.appelOffre.dateDebutAoDto=this.dateAo[0]
    this.appelOffre.dateFinAoDto=this.dateAo[1]
    console.log(this.appelOffre)
    this.appelOffreService.createAo(this.appelOffre).subscribe((res)=>{
      this.appelOffre=new AppelOffre()
      this.dateAo=[new Date(),new Date()]
      this.toastr.success("congratulation","appel offre a été crée")
    },(error => {
      this.toastr.error("OUPS","error has occurred")
    }))
    this.visible = false;
  }
}
