import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: '', redirectTo : '/authentication', pathMatch : 'full'},
  {path: 'Home', component: LayoutComponent,
      children : [
        {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
