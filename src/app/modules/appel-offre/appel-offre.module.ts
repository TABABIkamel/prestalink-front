import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppelOffreRoutingModule } from './appel-offre-routing.module';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppeloffreComponent
  ],
  imports: [
    CommonModule,
    AppelOffreRoutingModule,
    NgxPaginationModule
  ],
  exports: [AppeloffreComponent]
})
export class AppelOffreModule { }
