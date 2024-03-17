import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Assicurati di importarlo

import { RouterOutlet } from '@angular/router';// Assumi che tu abbia definito le tue rotte qui
import { AppComponent } from './app.component'; // Il tuo componente radice
import { ProdottiComponent } from './prodotti/prodotti.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    // Qui dichiari i componenti
   
  ],
  imports: [
    AppComponent,
    ProdottiComponent,
    LoginComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    BrowserAnimationsModule,
    HttpClientModule, // Necessario per HttpClient
    RouterOutlet

  ],
  providers: [],
  bootstrap: [AppModule], // Cambiato in AppComponent
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
