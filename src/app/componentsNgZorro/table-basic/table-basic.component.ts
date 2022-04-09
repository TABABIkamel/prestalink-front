import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {Approval} from "../../Models/Approval";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Contrat} from "../../Models/Contrat";

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
  contract:Contrat=new Contrat();
  listOfData: any[] = [];
  isVisible=false
  approval:Approval=new Approval();
  constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService,private route:Router) {
  }
  showModal(id:any) {
    this.isVisibleData.emit(true)
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

  handleCancel() {
    this.isVisible=false
  }
  handleOk() {
    console.log(this.contract)
    this.appelOffreService.generateContract(this.contract).subscribe(res=>{console.log(res)},err=>{console.log(err)})
    this.isVisible=false
  }

  showContratModal() {
    this.isVisible=true;
  }
}
