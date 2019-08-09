import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './employee/employee.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService} from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AuthModule

  ],
  providers: [ToastrService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
