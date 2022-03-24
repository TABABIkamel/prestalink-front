import {Component, Input} from '@angular/core';
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-moadal-basic',
  templateUrl: './moadal-basic.component.html'
})
export class MoadalBasicComponent {
  @Input() buttonTitle:string="Show Modal";
  isVisible = false;

  constructor() {}
  modalTitle:string="default title";
  content:string="Content by Default"
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
