import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdottoModule } from './models/prodotto.module';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,
        ProdottiComponent, LoginComponent,DashboardComponent,ProdottoModule,NavbarComponent]
})
export class AppComponent {
  title = 'ecommerce';
}
