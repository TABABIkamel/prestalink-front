import {Component, OnInit} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-appeloffre',
  templateUrl: './appeloffre.component.html'
})
export class AppeloffreComponent implements OnInit{
  loading=true
  appelOffres:any
  page:number=1;
  appelOffresLength:number;
  constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.appelOffreService.getAllAo().subscribe((res)=>{
      let pipes = new DatePipe('en-US');
      res.dateDebutAoDto =pipes.transform(res.dateDebutAoDto, 'yyyy-MM-dd')
      this.appelOffres=res
      this.appelOffresLength=this.appelOffres.length;
    },(err)=>{this.toastr.error('Oups!', 'May be you are not authorized');})
  }
}
