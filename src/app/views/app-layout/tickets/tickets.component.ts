import { Component } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  ticketId!: string;
  registrationUrl!: string;

  constructor(){}

  ngOnInit(){
    this.getTicketId();
  }


  getTicketId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.ticketId = segments[segments.length - 1];
    let mainUrl = window.location.origin
    console.log('mainUrl', mainUrl);
    this.registrationUrl = mainUrl + '/#/app/register-customer/' + this.ticketId
  }

}
