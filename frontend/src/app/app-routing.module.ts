import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SProfileComponent} from "./student/s-profile/s-profile.component.ts";


const routes: Routes = [{
  path: 'student-profile ',
  component: SProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
