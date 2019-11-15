import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';
import { DasboardComponent } from 'src/pages/dasboard/dasboard.component';
import { PetsComponent } from 'src/pages/pets/pets.component';
import { MyaccountComponent } from 'src/pages/myaccount/myaccount.component';
import { CustomersComponent } from 'src/pages/customers/customers.component';
import { PermissionsComponent } from 'src/pages/permissions/permissions.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'dashboard', pathMatch: 'full', component: DasboardComponent },
  { path: 'pets', pathMatch: 'full', component: PetsComponent },
  { path: 'myaccount', pathMatch: 'full', component: MyaccountComponent },
  { path: 'customers', pathMatch: 'full', component: CustomersComponent },
  { path: 'permissions', pathMatch: 'full', component: PermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
