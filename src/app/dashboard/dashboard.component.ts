import { Component } from '@angular/core';
import { ProdottiComponent } from '../prodotti/prodotti.component';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProdottiComponent,RouterOutlet,MatIconModule,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
