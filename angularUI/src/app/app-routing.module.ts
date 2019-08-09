import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path:'',redirectTo:'dashbord',pathMatch:'full'},
  {path:'dashbord',component:DashboardComponent},
  {path:'employee', loadChildren:'./employee/employee.module#EmployeeModule',canActivate:[AuthGuard]},
  {path:'auth',loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

