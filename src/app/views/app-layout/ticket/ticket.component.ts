import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  ticketId!: string;
  registrationUrl!: string;
  Guest:any;
  pageLoading:boolean = false;

  constructor(private api: HttpServiceService){}

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
    this.registrationUrl = mainUrl + '/#/app/registration/' + this.ticketId
  }

  getGuest(){
    this.pageLoading = true;
    this.api.get('guests/' + this.ticketId).subscribe(
      res=>{
        let guest:any = res;
        console.log('metrics',this.Guest)
        const baseUrl = window.location.origin;
        this.Guest = guest.data.map((item:any) => ({
          ...item,
          qrcode: `${baseUrl}/app/qr-checkin/${item.id}` // Add the `prcode` field
      }));
      console.log('guest', this.Guest)
      this.pageLoading=false;
      },
      err=>{
        console.log('err',err)
      }
    )
  }


  generatePDF() {
    // Select the HTML element to convert to PDF
    const dataElement = document.getElementById('pdfContent');

    if (dataElement) {
      html2canvas(dataElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Create jsPDF instance

        // Calculate image height in PDF pages based on canvas dimensions and A4 size
        const imgWidth = 190; // width of A4 page in mm with margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('download.pdf'); // Download the PDF
      });
    } else {
      console.error("Element not found");
    }
  }


}
