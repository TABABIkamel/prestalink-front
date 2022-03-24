import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import { DatePipe } from '@angular/common'
import {MoadalBasicComponent} from "../../componentsNgZorro/moadal-basic/moadal-basic.component";
import {TestService} from "../../services/test.service";
@Component({
  selector: 'app-appeloffre',
  templateUrl: './appeloffre.component.html'
})
export class AppeloffreComponent implements OnInit{
  @ViewChild(MoadalBasicComponent) modal: MoadalBasicComponent;
  loading=true
  appelOffres:any
  page:number=1;
  appelOffresLength:number;
  constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService,private testService:TestService) { }

  ngOnInit(): void {

    this.appelOffreService.getAllAo().subscribe((res)=>{
      console.log(res)
      let pipes = new DatePipe('en-US');
      res.dateDebutAoDto =pipes.transform(res.dateDebutAoDto, 'yyyy-MM-dd')
      this.appelOffres=res
      this.appelOffresLength=this.appelOffres.length;
    },(err)=>{this.toastr.error('Oups!', 'May be you are not authorized');})
  }

  showDatail(description:string,titrePoste:string) {
    this.modal.modalTitle=titrePoste
    this.modal.content=description
    this.modal.showModal();

  }

  test() {
    this.testService.tokenadmin().subscribe((res)=>{console.log(res)},(error => {console.log(error)}))
  }
}
