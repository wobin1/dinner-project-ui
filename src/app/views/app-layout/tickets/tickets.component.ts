import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  ticketId!: string;
  registrationUrl!: string;
  Guests:any;
  pageLoading:boolean = false;

  constructor(private api: HttpServiceService, private router: Router){}

  ngOnInit(){
    this.getTicketId();
    this.getGuest();
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

  getGuest(){
    this.pageLoading = true;
    this.api.get('guests').subscribe(
      res=>{
        let guest:any = res;
        console.log('metrics',this.Guests)
        const baseUrl = window.location.origin;
        this.Guests = guest.data.map((item:any) => ({
          ...item,
          qrcode: `${baseUrl}/#/app/qr-checkin/${item.id}` // Add the `prcode` field
      }));
      console.log('guest', this.Guests)
      this.pageLoading=false;
      },
      err=>{
        console.log('err',err)
      }
    )
  }

  route(id:any){
    this.router.navigateByUrl('/app/ticket/' + id)
  }

}
