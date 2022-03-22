import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {DatePickerComponent} from "../../componentsNgZorro/date-picker/date-picker.component";
import {FormComponent} from "../../componentsNgZorro/form/form.component";
import {InputAutoCompleteComponent} from "../../componentsNgZorro/input-auto-complete/input-auto-complete.component";
import {
  NzDemoDropdownPlacementComponent
} from "../../componentsNgZorro/nz-demo-dropdown-placement/nz-demo-dropdown-placement.component";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { MoadalBasicComponent } from '../../components/moadal-basic/moadal-basic.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";
import { CardComponent } from '../../card/card.component';



@NgModule({
  declarations: [DatePickerComponent,FormComponent,InputAutoCompleteComponent,NzDemoDropdownPlacementComponent, MoadalBasicComponent, CardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzDropDownModule,
    NzAutocompleteModule,
    NzGridModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule,
    NzButtonModule,
  ],
  exports: [DatePickerComponent,FormComponent,InputAutoCompleteComponent,NzDemoDropdownPlacementComponent,MoadalBasicComponent]
})
export class SharedModule { }
