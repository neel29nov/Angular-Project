import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { TokenInterceptorService } from './shared/interceptor/token-interceptor.service';
// import { HtmlWebpackPlugin  } from 'html-webpack-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    // HtmlWebpackPlugin
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
