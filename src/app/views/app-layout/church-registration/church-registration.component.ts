import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-church-registration',
  templateUrl: './church-registration.component.html',
  styleUrl: './church-registration.component.scss',
  providers: [MessageService]
})
export class ChurchRegistrationComponent {
  createChurchForm:any;
  isSubmitted: boolean = false;
  loading:boolean = false;
  referalId:any;
  pharmacyId:any;
  url:any;
  gender:any



  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}


  ngOnInit(){
    this.createChurchForm = this.fb.group({
      // Basic information
      full_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      phone_number: ['', Validators.required],
      is_church: [true],
      is_bouncer: [false],
      is_admin: [false],
    });

  }

  toggleCreateProduct(){

  }

  getReferralId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.referalId = segments[segments.length - 1];
  }

  getGender(){
    this.api.get('referals/gender').subscribe(
      res=>{
        console.log(res)
        this.gender = res
        this.gender = this.gender.data
      }, err=>{
        console.log(err)
      }
    )
  }


  get f() {
    return this.createChurchForm.controls;
  }

  save(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.createChurchForm.invalid){
      console.log("form invalid")
      return;
    }


    this.api.post('users', this.createChurchForm.value).subscribe(
      res=>{
        console.log(res)
        this.loading = !this.loading;
        this.isSubmitted = false;
        this.createChurchForm.reset();
        this.showSuccess('Church registered successfully')
      },err=>{
        console.log(err);
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
