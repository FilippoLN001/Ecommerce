import { Component, Input } from '@angular/core';
import {  ProdottoModule } from '../models/prodotto.module';
import { ProdottiComponent } from '../prodotti/prodotti.component';
import { NgFor } from '@angular/common';
import { ProdottiService } from '../prodotti/prodotti.service';
@Component({
  selector: 'app-trending-products',
  standalone: true,
  imports: [ProdottiComponent,ProdottoModule,NgFor],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.css',
  template: `<p>{{ datiprodotti }}</p>`,
  providers: [ProdottiService],
})
export class TrendingProductsComponent {
 
}
