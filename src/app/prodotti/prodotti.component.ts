import { Component, Input, OnInit } from '@angular/core';
import {Prodotto} from '../models/prodotto.module';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { ProdottiService } from './prodotti.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [NgFor,CurrencyPipe,DatePipe,NavbarComponent],
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css'],
  providers: [ProdottiService] // Se il servizio è specifico di questo componente
})
export class ProdottiComponent implements OnInit{
  @Input() listaProdotti: Prodotto[]=[];
 
  constructor(private prodottoService: ProdottiService) { }
  ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottoService.getProdotti().subscribe(
      (prodotti: Prodotto[]) => {
       console.log('Prodotti ricevuti:', prodotti);
        this.listaProdotti = prodotti;
      },
      
      (error) => {
        console.error('Errore durante il recupero dei prodotti:', error);
      }
    );
  }
}
