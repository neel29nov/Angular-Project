import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {path: '', component : MainComponent},
  {path: 'main', component : MainComponent},
  {path: 'Login', component : LoginComponent},
  {path: 'Signup', component : SignupComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
