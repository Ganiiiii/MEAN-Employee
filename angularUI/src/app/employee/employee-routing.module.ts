import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DisplayComponent } from './display/display.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',redirectTo:'display',pathMatch:'full'},
  {path:'register',component:AddComponent},
  {path:'updateRecord/:_id',component:UpdateFormComponent},
  {path:'display',component:DisplayComponent},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
