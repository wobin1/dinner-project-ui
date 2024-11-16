import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { ChurchRegistrationComponent } from './church-registration/church-registration.component';
import { QrVerificationComponent } from './qr-verification/qr-verification.component';



const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent },
      {path: 'registration/:id', component: RegisterCustomerComponent },
      {path: 'tickets', component: TicketsComponent },
      {path: 'ticket/:id', component: TicketComponent },
      {path: 'church-registration', component: ChurchRegistrationComponent },
      {path: 'qr-checkin/:id', component: QrVerificationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
