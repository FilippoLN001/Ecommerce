// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; // Assumi che tu abbia un componente per la home
import { ProdottiComponent } from './prodotti/prodotti.component'; // E così via per gli altri componenti
//import { AboutComponent } from './about/about.component';
//import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'prodotti', component: ProdottiComponent },
  //{ path: 'about', component: AboutComponent },
 // { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent }
 // { path: 'register', component: RegisterComponent },
  // Aggiungi altre configurazioni di routing qui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
