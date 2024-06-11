import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { EdituserComponent } from './edituser/edituser.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ModalComponent,
    EdituserComponent
  ],
  imports: [
    CommonModule,NgbProgressbarModule,NgbToastModule,
    DashboardRoutingModule,HttpClientModule,ReactiveFormsModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
