import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Aggiungi questa linea
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { LoginComponent } from './login/login.component';

import { ProdottoModule } from './models/prodotto.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgModule,
    BrowserModule,
    FormsModule,
    PasswordModule,
    ProdottiComponent,
    LoginComponent,
    ProdottoModule,
    CurrencyPipe,
    DatePipe,
    RouterOutlet,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers :[],
  bootstrap: [AppModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Aggiungi questa linea
  
})
export class AppModule { }
