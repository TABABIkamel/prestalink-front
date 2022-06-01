import {Component, OnInit} from '@angular/core';
import {NzSelectSizeType} from "ng-zorro-antd/select";
import {TrouverProfileService} from "../../services/trouver-profile.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-scrapping',
  templateUrl: './scrapping.component.html',
  styleUrls: ['./scrapping.component.css']
})
export class ScrappingComponent implements OnInit {
  tagValue = new Array();
  listOfOption: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';

  constructor(private toastr: ToastrService,private service:TrouverProfileService) {
  }

  ngOnInit(): void {
    this.tagValue = ['java']
  }
  cleanData(data:string){
    while (data.includes('['))
      data=data.replace('[', '');
    while (data.includes(']'))
      data=data.replace(']', '');
    while (data.includes(','))
      data=data.replace(',', ' ');
    while (data.includes('"'))
      data=data.replace('"', '');

    return data
  }
  startCrapping() {
    const dataCleaned=this.cleanData(JSON.stringify(this.tagValue))
    console.log(dataCleaned)
    this.service.startScrapping(dataCleaned)
      .subscribe(res=>{
        this.toastr.success("","scrapping process est terminé")
      },error => this.toastr.error("","une erreur s'est produite"))
    this.toastr.success("","scrapping process est lancé")
  }
}
