import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetLinkComponent } from './reset-link/reset-link.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ChangePassComponent,
    ResetLinkComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    ChangePassComponent
  ]
})
export class AuthModule { }
