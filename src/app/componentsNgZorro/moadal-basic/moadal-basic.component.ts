import {Component, Input} from '@angular/core';
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-moadal-basic',
  templateUrl: './moadal-basic.component.html'
})
export class MoadalBasicComponent {
  @Input() buttonTitle:string="Show Modal";
  handleOk:any=():void=>{console.log('ok');this.isVisible=false};
  handleCancel: any=():void=>{console.log("cancel");this.isVisible = false;};
  isVisible = false;

  constructor() {}
  modalTitle:string="default title";
  content:string="Content by Default"


  showModal(): void {
    this.isVisible = true;
  }
}
