
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './components/Authentication/log-in/log-in.component';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { RegisterComponent } from './components/Authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch        : 'full', redirectTo: '/' },
  { path: 'navbar', component  : NavbarComponent },
  { path: 'footer', component  : FooterComponent },
  { path: 'login', component   : LogInComponent },
  { path: 'sendmail', component: SendmailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }