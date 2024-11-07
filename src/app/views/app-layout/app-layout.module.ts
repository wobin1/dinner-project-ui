import { PrimengModule } from './../../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AppLayoutComponent } from './app-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { ChurchRegistrationComponent } from './church-registration/church-registration.component';
import { QrVerificationComponent } from './qr-verification/qr-verification.component';




@NgModule({
  declarations: [
    AppLayoutComponent,
    DashboardComponent,
    RegisterCustomerComponent,
    TicketsComponent,
    TicketComponent,
    ChurchRegistrationComponent,
    QrVerificationComponent,

  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    QRCodeModule
  ]
})
export class AppLayoutModule { }
