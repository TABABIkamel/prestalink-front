import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppeloffreComponent} from "../../components/appeloffre/appeloffre.component";
import {GestionCandidatComponent} from "../../components/gestion-candidat/gestion-candidat.component";
import {CandidatureReviewedComponent} from "../../components/candidature-reviewed/candidature-reviewed.component";
import {MesCandidatureComponent} from "../../components/mes-candidature/mes-candidature.component";
import {MesAppelOffreComponent} from "../../components/mes-appel-offre/mes-appel-offre.component";
import {ViewContratComponent} from "../../components/view-contrat/view-contrat.component";
import {FindProfilesComponent} from "../../components/find-profiles/find-profiles.component";

const routes: Routes = [
  {path:'',component:AppeloffreComponent},
  {path:'gestionCandidat',component:GestionCandidatComponent},
  {path:'candidatEvalue',component:CandidatureReviewedComponent},
  {path:'mesCandidatures',component:MesCandidatureComponent},
  {path:'mesAppelOffres',component:MesAppelOffreComponent},
  {path:'mesContrats/:username',component:ViewContratComponent},
  {path:'profils',component:FindProfilesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppelOffreRoutingModule { }
