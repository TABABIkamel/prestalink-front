import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {CompleteProfileComponent} from "../../components/completeProfile/complete-profile.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";

@NgModule({
  declarations: [CompleteProfileComponent],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    NzAutocompleteModule,
    FormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzCollapseModule,
    ReactiveFormsModule,
    NzIconModule,
    NzCheckboxModule
  ],
  exports: [CompleteProfileComponent]
})
export class CompleteProfileModule { }
