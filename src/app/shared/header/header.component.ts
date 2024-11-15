import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dropDown:boolean = false;
  showMobileMenu:boolean = false;

    menu = [
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
        "route": "/app/registration/1"
      },
      {
        "name": "Church registration",
        "icon": "assets/icons/reciept.png",
        "route": "/app/church-registration"
      }
    ]

  constructor(private router: Router){}

  ngOnInit() {
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
