import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/requests/login.request';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginRequest = { userName: '', password: '' };
  error: string = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']); // Redirect to home or dashboard
      },
      error: () => (this.error = 'Invalid username or password'),
    });
  }
  
  loginWithGoogle() {
    window.location.href = 'https://localhost:7158/api/Auth/external-login?provider=Google&returnUrl=http://localhost:4200/auth/google-callback';
  }
}
