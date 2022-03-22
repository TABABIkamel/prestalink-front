import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";

const routes: Routes = [
  {path:'',component:AppeloffreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppelOffreRoutingModule { }
