import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  loginForm!: any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  hidePassword: boolean = true;
  toastType!:string;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private store: StorageService,
              private messageService: MessageService){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  routeUser(userData:any){
    console.log('routing user')
    if(userData.is_admin){
      this.router.navigate(['/app/dashboard']);
    }else if(userData.is_church){
      this.router.navigate(['/app/tickets']);
    }
  }

  get f(){return this.loginForm.controls;}

  login(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.loginForm.invalid){
      this.loading = false;
      return;
    }

    const formData = new FormData();
    formData.set('username', this.loginForm.get('email')?.value);
    formData.set('password', this.loginForm.get('password')?.value);

    this.auth.login(formData).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        let response:any = res;
        this.showSuccess('login successfull!')
        this.store.saveJson('user', response.data)
        this.routeUser(response.data)
      },
      (err) => {
        console.error(err);
        this.showError('Invalid email or password!')
        this.loading = false;
      }
    );

  }

  viewPassword(){
    this.hidePassword =!this.hidePassword;
  }

  showSuccess(message:string) {
    console.log(message);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
