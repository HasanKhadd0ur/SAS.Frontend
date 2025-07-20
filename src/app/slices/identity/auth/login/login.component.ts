import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/requests/login.request';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginRequest = { userName: '', password: '' };
  error: string = '';

  constructor(private auth: AuthenticationService, 
              private router: Router,
              private storageService :StorageService) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: (res) => {
        // Save token
        this.storageService.setLocalStorage('token', res.token);

        // Save refresh token
        this.storageService.setLocalStorage('refreshToken', res.tokenInfo.refreshToken);

        // Save user info
        const userInfo = {
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          username: res.tokenInfo.username,
        };
        this.storageService.setLocalStorage('user', userInfo);

        // Navigate to home/dashboard
        this.router.navigate(['/']);
      },
      error: () => (this.error = 'Invalid username or password'),
    });
  }
  
  loginWithGoogle() {
    window.location.href = 'https://localhost:7158/api/Auth/external-login?provider=Google&returnUrl=http://localhost:4200/auth/google-callback';
  }
}
