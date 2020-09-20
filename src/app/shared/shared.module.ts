import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, MenuComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent, MenuComponent, FooterComponent, LayoutComponent]
})
export class SharedModule { }
