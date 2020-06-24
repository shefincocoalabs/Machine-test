import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'dashboard-seller/:role', component: DashboardSellerComponent, canActivate: [AuthGuard] },
  {path: 'dashboard-buyer/:role', component: DashboardBuyerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
