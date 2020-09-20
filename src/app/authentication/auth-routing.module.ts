import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'main', component : MainComponent},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignupComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'change-password', component : ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
