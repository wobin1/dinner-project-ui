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
  createReferalForm:any;
  isSubmitted: boolean = false;
  loading:boolean = false;
  referalId:any;
  pharmacyId:any;
  url:any;
  gender:any



  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}


  ngOnInit(){
    this.getPharmacyId()
    this.getReferralId()
    this.getGender()
    this.createReferalForm = this.fb.group({
      // Basic information
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      pharmacy_id: [''],
      phone_number: ['', Validators.required],
      gender_id: ['', Validators.required],
      status_id: ['', Validators.required],
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
    return this.createReferalForm.controls;
  }

  save(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.createReferalForm.invalid){
      console.log("form invalid")
      return;
    }

    if (this.pharmacyId) {
      this.createReferalForm.patchValue({ pharmacy_id: this.pharmacyId });
    } else {
      console.log("pharmacyId is not set");
      this.loading = false;
      return;
    }

    this.createReferalForm.patchValue({pharmacy_id: this.pharmacyId})
    this.createReferalForm.patchValue({status_id: 1})

    this.api.post('referals', this.createReferalForm.value).subscribe(
      res=>{
        console.log(res)
        this.loading = !this.loading;
        this.isSubmitted = false;
        this.createReferalForm.reset();
        this.showSuccess('Referal registered successfully')
      },err=>{
        console.log(err);
      }
    )

  }

  getPharmacyId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.pharmacyId = segments[segments.length - 1];
    let mainUrl = window.location.origin
    console.log('mainUrl', mainUrl);
  }


  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
