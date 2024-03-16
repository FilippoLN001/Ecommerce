import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, } from '@angular/forms';
import { AuthService } from '../auth.service'; // Assicurati che il percorso sia corretto
import { NavbarComponent } from '../navbar/navbar.component';
import { PasswordModule } from 'primeng/password';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule,NavbarComponent,PasswordModule,AppComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  value!: string;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        // Logica per il successo del login
        console.log('Login successful');
      } else {
        // Logica per il fallimento del login
        console.log('Login failed');
      }
    }
  }

}
