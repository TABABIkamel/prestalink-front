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
import {NzUploadModule} from "ng-zorro-antd/upload";
import { ModifierProfileComponent } from '../../components/modifier-profile/modifier-profile.component';
import { ModifierCvComponent } from '../../components/modifier-cv/modifier-cv.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import { ScrappingComponent } from '../../components/scrapping/scrapping.component';
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [CompleteProfileComponent, ModifierProfileComponent, ModifierCvComponent, ScrappingComponent],
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
    NzCheckboxModule,
    NzUploadModule,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
  ],
  exports: [CompleteProfileComponent,ModifierProfileComponent,ModifierCvComponent]
})
export class CompleteProfileModule { }
