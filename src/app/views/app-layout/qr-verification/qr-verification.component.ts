import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-qr-verification',
  templateUrl: './qr-verification.component.html',
  styleUrl: './qr-verification.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class QrVerificationComponent {
  ticketId:any;
  showCheckout:boolean=false;
  showSuccessMessage:boolean=false;
  pageLoading:boolean=false;
  laoding:boolean=false;

  constructor(private api:HttpServiceService, private messageService: MessageService){}


  ngOnInit(){
    this.checkin(this.getTicketId());
  }

  getTicketId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.ticketId = segments[segments.length - 1];

    return this.ticketId;
  }


    checkin(ticketId:any){
      this.pageLoading = true;
    this.api.patch('guests/checkin/' + ticketId).subscribe(
      res=>{
        console.log(res);
        this.showSuccess('user checked in successfully')
        this.pageLoading = false;
        this.showCheckout=false;      },
      err=>{
        console.log(err);
        this.showError(err.error.detail)
        if(err.status==400){
          this.showCheckout=true;
        }
        this.pageLoading = false;
      }
    )
  }


  checkout(){
    this.laoding = true;
    this.api.patch('guests/checkout/' + this.ticketId).subscribe(
      res=>{
        console.log(res);
        this.showCheckout=false;
        this.showSuccess('user checked out successfully')
        this.laoding = false;
      },
      err=>{
        console.log(err);
        this.showError(err.error.detail)
        this.laoding = false;
      }
    )
  }


  showSuccess(message: any) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}
