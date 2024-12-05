import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss',
  providers: [MessageService]
})
export class RegisterCustomerComponent {
  createGuestForm:any;
  isSubmitted: boolean = false;
  loading:boolean = false;
  userId:any;
  churches:any;
  url:any;
  church:any;
  tables:any;
  user:any;



  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}


  ngOnInit(){
    this.getChurches()
    this.getUserId();
    this.getTables();
    this.createGuestForm = this.fb.group({
      // Basic information
      full_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      church: [this.getUserId()],
      phone_number: ['', Validators.required],
      table: ['', Validators.required],
      attendance_status: [1],
    });

  }

  toggleCreateProduct(){

  }

  getUserId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.userId = segments[segments.length - 1];
    console.log('userId', this.userId);
    this.getUser()
    return Number(this.userId)
  }

  getUser(){
    this.api.get('users/'+ this.userId).subscribe(
      res=>{
        this.user = res;
        console.log('user', this.user)
      }, err=>{
        console.log(err)
      }
    )
  }

  getChurches(){
    this.api.get('users/churches').subscribe(
      res=>{
        this.churches = res;
        console.log('churches', this.churches.data)
      }, err=>{
        console.log(err)
      }
    )
  }

  getTables(){
    this.api.get('guests/tables').subscribe(
      res=>{
        this.tables = res;
        console.log('tables', this.tables.data)
      }, err=>{
        console.log(err)
      }
    )
  }

  get f() {
    return this.createGuestForm.controls;
  }

  save(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.createGuestForm.invalid){
      console.log("form invalid")
      return;
    }


    console.log('createGuestForm', this.createGuestForm.value)

    this.api.post('guests', this.createGuestForm.value).subscribe(
      res=>{
        console.log(res)
        this.loading = !this.loading;
        this.isSubmitted = false;
        this.createGuestForm.reset();
        this.showSuccess('Guest registered successfully')
      },err=>{
        console.log(err);
        this.loading = false;
      }
    )

  }


  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
