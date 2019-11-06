import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  @Output()
  registered = new EventEmitter<string>();
  

  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    ) {}
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.notification.config({
      nzPlacement: 'bottomRight'
    })

    if(this.validateForm.status === 'VALID')
    {
      this.registered.emit('complete')
      this.notification.create(
        'success',
        'Đăng kí tài khoản thành công !',
        ""
      )
    }
    
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
    });
    
  }



}
