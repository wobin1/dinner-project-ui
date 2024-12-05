import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrl: './churches.component.scss'
})
export class ChurchesComponent {
  pageLoading:boolean=false;
  churchesData:any;
  tableHeader = [
    "Church",
    "Email",
    "Phone number",
    "Number of guests"
  ]

  constructor(private api: HttpServiceService){}


  ngOnInit(){
    this.getChurchesData();
  }


  getChurchesData(){
    this.pageLoading = true;
    this.api.get('users/churches').subscribe(
      res=>{
        this.churchesData = res;
        this.pageLoading=false;
      }, err=>{
        console.log('Error fetching recent referals', err)
      }
    )
  }

}
