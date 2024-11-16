import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  @Output() toggleMenu = new EventEmitter();

  menu:any;
  userId:any;

  constructor(private router: Router, private store:StorageService){}


  ngOnInit(){
    this.userId = this.store.getJson('user').id
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
      }
    ]
  }

  route(page:string){
    this.router.navigate([page]);
  }

  onclick(){
    this.toggleMenu.emit();
  }


}
