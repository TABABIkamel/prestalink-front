import {Component, Input, ViewEncapsulation} from '@angular/core';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'app-input-auto-complete',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-auto-complete.component.html'
})
export class InputAutoCompleteComponent {
  @Input() elements:any[]=new Array();
  @Input() placeholder:string;
  inputValue:any
  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
}
