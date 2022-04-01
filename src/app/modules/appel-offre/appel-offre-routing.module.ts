import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";
import {GestionCandidatComponent} from "../../components/gestion-candidat/gestion-candidat.component";
import {CandidatureReviewedComponent} from "../../components/candidature-reviewed/candidature-reviewed.component";
import {MesCandidatureComponent} from "../../components/mes-candidature/mes-candidature.component";

const routes: Routes = [
  {path:'',component:AppeloffreComponent},
  {path:'gestionCandidat',component:GestionCandidatComponent},
  {path:'candidatEvalue',component:CandidatureReviewedComponent},
  {path:'mesCandidatures',component:MesCandidatureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppelOffreRoutingModule { }
