import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppelOffreRoutingModule } from './appel-offre-routing.module';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    AppeloffreComponent
  ],
    imports: [
        CommonModule,
        AppelOffreRoutingModule,
        NgxPaginationModule,
        SharedModule,
        NzButtonModule
    ],
  exports: [AppeloffreComponent]
})
export class AppelOffreModule { }
