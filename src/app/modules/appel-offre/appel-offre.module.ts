import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppelOffreRoutingModule } from './appel-offre-routing.module';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzAlertModule} from "ng-zorro-antd/alert";
import { GestionCandidatComponent } from '../../components/gestion-candidat/gestion-candidat.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputModule} from "ng-zorro-antd/input";
import { CandidatureReviewedComponent } from '../../components/candidature-reviewed/candidature-reviewed.component';
import { MesCandidatureComponent } from '../../components/mes-candidature/mes-candidature.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    AppeloffreComponent,
    GestionCandidatComponent,
    CandidatureReviewedComponent,
    MesCandidatureComponent
  ],
  imports: [
    CommonModule,
    AppelOffreRoutingModule,
    NgxPaginationModule,
    SharedModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzAlertModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzInputModule,
    NzDividerModule,
    NzTableModule
  ],
  exports: [AppeloffreComponent,GestionCandidatComponent]
})
export class AppelOffreModule { }
