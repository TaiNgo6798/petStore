import { Component, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from "@angular/router"
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import axios from 'axios'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: any
  password: any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private authService: AuthService,

  ) { }

  validateForm: FormGroup

  private user: SocialUser;
  private loggedIn: boolean;

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res)
        if (this.loggedIn) {
          this.notification.config({
            nzPlacement: 'bottomRight'
          })
          this.router.navigateByUrl('/dasboard')
          this.notification.create(
            'success',
            'Đăng nhập thành công !',
            ""
          )
        }
      })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res)
        if (this.loggedIn) {
          this.notification.config({
            nzPlacement: 'bottomRight'
          })
          this.router.navigateByUrl('/dasboard')
          this.notification.create(
            'success',
            'Đăng nhập thành công !',
            ""
          )
        }
      })
  }

  signOut(): void {
    this.authService.signOut();
  }

  imgClick(): void {
    const registerForm = window.document.querySelector('.register-box').classList
    const loginForm = window.document.querySelector('.login-box').classList
    const imgLeft = window.document.querySelector('.img-left').classList

    registerForm.remove('show-large')
    loginForm.toggle('show')
    imgLeft.toggle('move-img-to-left')
    imgLeft.remove('move-img-to-left-register')
  }

  registerClick(): void {
    const registerForm = window.document.querySelector('.register-box').classList
    const loginForm = window.document.querySelector('.login-box').classList
    const imgLeft = window.document.querySelector('.img-left').classList
    loginForm.remove('show')
    loginForm.add('hide')

    registerForm.remove('hide')
    registerForm.add('show-large')

    imgLeft.remove('move-img-to-left')
    imgLeft.add('move-img-to-left-register')
  }

  checkAccountApi(): Boolean {
    axios({
      method: 'POST',
      url: "http://localhost:8080/api/login",
      data: {
        username: "taingo",
        password: "123456",
        token: 'aavbnvbnvbn'
      },
    })
      .then(function (response) {
        console.log(response);
        return true
      })
      .catch(function (error) {
        console.log(error);
      });
    return false
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
    }

    this.notification.config({
      nzPlacement: 'bottomRight'
    })
    this.checkAccountApi()
    // if (this.username === 'admin' && this.password === 'admin') {
    //   this.router.navigateByUrl('/dashboard')
    //   this.notification.create(
    //     'success',
    //     'Đăng nhập thành công !',
    //     ""
    //   )
    // }
    // else {
    //   this.notification.create(
    //     'error',
    //     'Sai tài khoản hoặc mật khẩu !',
    //     ""
    //   )
    // }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })

  }
}

