import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule} from './employee-routing.module';

import { AddComponent } from './add/add.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DisplayComponent } from './display/display.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../shared/services.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import {NgxMaskModule} from 'ngx-mask';
import { TagInputModule } from 'ngx-chips';
import { NgxCurrencyModule } from "ngx-currency";
import { AvatarModule } from 'ngx-avatar';
import { ModalModule } from 'ngx-bootstrap/modal';

//import { ToastrModule, ToastrService} from 'ngx-toastr';
@NgModule({
  declarations: [
    AddComponent,
    UpdateFormComponent,
       DisplayComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    TagInputModule,
    NgxCurrencyModule,
    AvatarModule
    
       
  ],
  exports:[
    AddComponent,
    UpdateFormComponent,

    DisplayComponent,
    PagenotfoundComponent
  ],
  providers: [ServicesService],
})
export class EmployeeModule { }
