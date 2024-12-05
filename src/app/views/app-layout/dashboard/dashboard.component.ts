import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    responsiveOptions: any[] | undefined;
    data: any;
    options: any;
    metrics:any;
    currentMonth:any;
    recentReferals:any = []
    pageLoading:boolean=false;
    guests:any;
    tableHeader = [
      "Full Name",
      "Email",
      "Phone number",
      "Church",
      ""
    ]

    constructor(
      private api: HttpServiceService
    ){}

    ngOnInit() {
      this.pageLoading=true;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.api.get('guests/guest-metrics').subscribe(
          res=>{
            this.metrics = res;
            console.log('metrics',this.metrics)
            this.data = {
              // labels: ['A', 'B'],
              datasets: [
                  {
                      data: [this.metrics.data.successfull, this.metrics.data.unsuccessfull],
                      backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--white-500')],
                      // hoverBackgroundColor: [documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--black-400')]
                  }
              ]
          };
          this.pageLoading=false;
          }
        )

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };

        const date = new Date();
        this.currentMonth = date.toLocaleString('default', { month: 'long' });

        this.get_metrics()
    }



    get_metrics(){
      this.api.get('guests').subscribe(
        res=>{
          this.guests = res;
        }, err=>{
          console.log('Error fetching recent referals', err)
        }
      )
    }


}
