import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CoursefinderComponent } from './components/coursefinder/coursefinder.component';
import { EnrollhereComponent } from './components/enrollhere/enrollhere.component';
import { ContactusModule } from './contactus/contactus.module';

import { AuthInterceptorService } from "./services/auth-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoutingComponents,
    HomeComponent,
    CoursefinderComponent,
    LoginComponent,
    EnrollhereComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ContactusModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
