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
import {NzMessageModule} from "ng-zorro-antd/message";
import { MesAppelOffreComponent } from '../../components/mes-appel-offre/mes-appel-offre.component';
import { ViewContratComponent } from '../../components/view-contrat/view-contrat.component';
import { FindProfilesComponent } from '../../components/find-profiles/find-profiles.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    AppeloffreComponent,
    GestionCandidatComponent,
    CandidatureReviewedComponent,
    MesCandidatureComponent,
    MesAppelOffreComponent,
    ViewContratComponent,
    FindProfilesComponent
  ],
  imports: [
    CommonModule,
    AppelOffreRoutingModule,
    NgxPaginationModule,
    SharedModule,
    NzMessageModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzAlertModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzInputModule,
    NzDividerModule,
    NzTableModule,
    NzCardModule,
    InfiniteScrollModule,
    FormsModule,
    NzSelectModule,

  ],
  exports: [AppeloffreComponent,GestionCandidatComponent]
})
export class AppelOffreModule { }
