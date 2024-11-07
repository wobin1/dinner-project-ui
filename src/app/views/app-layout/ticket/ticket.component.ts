import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
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
    this.registrationUrl = mainUrl + '/#/app/registration/' + this.ticketId
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
