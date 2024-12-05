import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dropDown:boolean = false;
  showMobileMenu:boolean = false;
  menu:any;
  userId:any;
  currentUser:any;

  constructor(private router: Router, private store:StorageService){}

  ngOnInit() {
    this.userId = this.store.getJson('user').id
    this.currentUser= this.store.getJson('user');
    console.log('current user', this.currentUser)
    this.menu =[
      {
        "name": "dashboard",
        "icon": "assets/icons/layout.png",
        "route": "/app/dashboard"
      },
      {
        "name": "Tickets",
        "icon": "assets/icons/package.png",
        "route": "/app/tickets"

      },
      {
        "name": "Registration",
        "icon": "assets/icons/reciept.png",
        "route": "/app/registration/" + this.userId
      },
      {
        "name": "Church registration",
        "icon": "assets/icons/reciept.png",
        "route": "/app/church-registration"
      },
      {
        "name": "Churches",
        "icon": "assets/icons/reciept.png",
        "route": "/app/churches"
      }
    ]

  }



  route(page:string){
    this.router.navigate([page]);
  }

  showDropDown(){
    this.dropDown = !this.dropDown
  }

  toggleMobileMenu(){
    console.log('show mobile menu');
    this.showMobileMenu =!this.showMobileMenu;
  }
}
