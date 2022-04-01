import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {Approval} from "../../Models/Approval";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html'
})
export class TableBasicComponent {
  @Output() isVisibleData = new EventEmitter<boolean>();
  @Output() modalData = new EventEmitter<any>();
  @Input() isGestionCandidatComponent:boolean;
  listOfData: any[] = [];
  isVisible=true
  approval:Approval=new Approval();
  constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService,private route:Router) {
  }
  showModal(id:any) {
    this.isVisibleData.emit(this.isVisible)
    this.modalData.emit(id);
  }
  refuserCandidat(id:string){
    this.approval.id=id
    this.approval.status=false
    this.appelOffreService.candidatureReview(this.approval).subscribe(()=>{
      this.route.navigateByUrl('gestionCandidat')
      this.toastr.success('Success','candidat a été refusé')
    })
  }
  accpeterCandidat(id:string){
    this.approval.id=id
    this.approval.status=true
    this.appelOffreService.candidatureReview(this.approval).subscribe(()=>{
      this.route.navigateByUrl('gestionCandidat')
      this.toastr.success('Success','candidat a été accepté')
    })
  }
}
