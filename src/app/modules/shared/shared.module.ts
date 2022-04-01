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
import { MoadalBasicComponent } from '../../componentsNgZorro/moadal-basic/moadal-basic.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";
import { CardComponent } from '../../components/card/card.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzAlertModule} from "ng-zorro-antd/alert";
import { TableBasicComponent } from '../../componentsNgZorro/table-basic/table-basic.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";
import { DrawerCreateComponent } from '../../componentsNgZorro/drawer-create/drawer-create.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";



@NgModule({
  declarations: [DatePickerComponent,FormComponent,InputAutoCompleteComponent,NzDemoDropdownPlacementComponent, MoadalBasicComponent, CardComponent, TableBasicComponent, DrawerCreateComponent],
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
    NzSwitchModule,
    NzCardModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzAlertModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzDrawerModule,
    NzInputModule,
    NzSelectModule,
  ],
  exports: [DatePickerComponent,FormComponent,InputAutoCompleteComponent,NzDemoDropdownPlacementComponent,MoadalBasicComponent,CardComponent,TableBasicComponent,DrawerCreateComponent]
})
export class SharedModule { }
