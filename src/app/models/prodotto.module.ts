import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProdottoModule {


 }
 export interface Prodotto {
  id: number;
  nome: string;
  categoria: string;
  prezzo: number;
  immagine : string;
  descrizione : string;
  data_messa_in_vendita: Date;
}