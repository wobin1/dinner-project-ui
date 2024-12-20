import { PaginationComponent } from './pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { CardComponent } from './card/card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { EmptyListComponent } from './empty-list/empty-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    MobileMenuComponent,
    CardComponent,
    PaginationComponent,
    EmptyListComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    QRCodeModule

  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    CardComponent,
    PaginationComponent,
    EmptyListComponent

  ]
})
export class SharedModule {
  constructor(){
    console.log('SharedModule loaded');
  }
}
