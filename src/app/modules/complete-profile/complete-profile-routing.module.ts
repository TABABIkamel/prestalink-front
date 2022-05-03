import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompleteProfileComponent} from "../../components/completeProfile/complete-profile.component";
import {ModifierProfileComponent} from "../../components/modifier-profile/modifier-profile.component";
import {ModifierCvComponent} from "../../components/modifier-cv/modifier-cv.component";

const routes: Routes = [
  {path:'',component:CompleteProfileComponent},
  {path:'modifierProfile/:username',component:ModifierProfileComponent},
  {path:'modifierCv/:username',component:ModifierCvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteProfileRoutingModule { }

