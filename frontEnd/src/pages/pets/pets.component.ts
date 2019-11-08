import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from "angularx-social-login";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import axios from 'axios'

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.less']
})
export class PetsComponent implements OnInit {
  isVisible = false;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService,
  ) {
    this.validateForm = this.fb.group({
      petName: ['', [Validators.required], [this.userNameAsyncValidator]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      Vacccine: ['', [Validators.required]]
    });
   }


  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.handleOk()
  }


  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  logoutClick(): void{
    localStorage.clear()
    this.authService.signOut()
    this.router.navigateByUrl('/login')
  }

  petsPage(): void{
    this.router.navigateByUrl('/pets')

  }

  dashboardPage(): void{
    this.router.navigateByUrl('/dashboard')
  }

  customersPage(): void{
    this.router.navigateByUrl('/customers')
  }

  myaccountPage(): void{
    this.router.navigateByUrl('/myaccount')
  }


  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser ? currentUser.token : 'randomshittoken'; // your token
    axios({
      method: 'GET',
      url: `http://localhost:8080/api/petshop/pets?token=${token}`,
    })
      .then((response:any) =>  {
        if(response.data.success === false)
        {
          this.notification.config({
            nzPlacement: 'bottomRight'
          })
          this.router.navigateByUrl('/login')
          this.notification.create(
            'error',
            'Bạn chưa đăng nhập !',
            ""
          )
        }
      })
  }

}
