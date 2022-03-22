import { Component } from '@angular/core';

@Component({
  selector: 'app-moadal-basic',
  templateUrl: './moadal-basic.component.html'
})
export class MoadalBasicComponent {
  isVisible = false;

  constructor() {}

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
