import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from "angularx-social-login";
import { NzNotificationService } from 'ng-zorro-antd/notification'
import axios from 'axios'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.less']
})
export class PermissionsComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService,
  ) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  photoUrl = this.currentUser.photoUrl ? this.currentUser.photoUrl : ''

  logoutClick(): void{
    localStorage.clear()
    this.authService.signOut()
    this.router.navigateByUrl('/login')
  }

  petsPage(): void{
    this.router.navigateByUrl('/pets')

  }

  menuClick(e): void{
    console.log(e)
  }

  dashboardPage(): void{
    this.router.navigateByUrl('/dashboard')
  }
  permissionsPage(): void{
    this.router.navigateByUrl('/permissions')
  }

  customersPage(): void{
    this.router.navigateByUrl('/customers')
  }

  myaccountPage(): void{
    this.router.navigateByUrl('/myaccount')
  }


  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('token'));
    var token = currentUser ? currentUser : 'randomshittoken'; // your token
    console.log(currentUser)
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