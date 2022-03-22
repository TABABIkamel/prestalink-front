import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppeloffreComponent} from "./components/appeloffre/appeloffre.component";
import {CompleteProfileComponent} from "./components/completeProfile/complete-profile.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'completeProfile', loadChildren: () => import('./modules/complete-profile/complete-profile.module').then(m => m.CompleteProfileModule) },
  {path:'appeloffre',loadChildren: () => import('./modules/appel-offre/appel-offre.module').then(m => m.AppelOffreModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
