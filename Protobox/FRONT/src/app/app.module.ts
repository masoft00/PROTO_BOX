//import { SendmailService } from 'src/app/services/sendmail/sendmail.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarliComponent } from './components/navbarli/navbarli.component';
import { Navbarli2Component } from './components/navbarli2/navbarli2.component';
import { LogInComponent } from './components/Authentication/log-in/log-in.component';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { SendmailService } from './services/sendmail/sendmail.service';
import { RegisterComponent } from './components/Authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NavbarliComponent,
    Navbarli2Component,
    LogInComponent,
    SendmailComponent,
    RegisterComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    
  ],
  providers: [SendmailService],
  bootstrap: [AppComponent],
  schemas  : [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }