import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from "angularx-social-login";


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.less']
})
export class MyaccountComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  logoutClick(): void{
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

  customersPage(): void{
    this.router.navigateByUrl('/customers')
  }

  myaccountPage(): void{
    this.router.navigateByUrl('/myaccount')
  }

  ngOnInit() {
  }

}
