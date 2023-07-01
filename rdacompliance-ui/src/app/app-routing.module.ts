import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { EnrollhereComponent } from './components/enrollhere/enrollhere.component';
import { CoursefinderComponent } from './components/coursefinder/coursefinder.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './contactus/contactus/contactus.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coursefinder', component: CoursefinderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'enrollhere', component: EnrollhereComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'contactus', loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule) },
  // { path: 'coursematerial', loadChildren: () => import('./coursematerial/coursematerial.module').then(m => m.CoursematerialModule) },
  { path: 'coursematerial', canActivate: [AuthGuard], loadChildren: () => import('./coursematerial/coursematerial.module').then(m => m.CoursematerialModule) },


  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = []
