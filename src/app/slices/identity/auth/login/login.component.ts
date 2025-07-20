import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/requests/login.request';
import { User } from 'src/app/core/models/response/AuthResponse';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { ToastrService } from 'ngx-toastr'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credentials: LoginRequest = { userName: '', password: '' };
  error: string = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
    private tokenService: TokenService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (!this.tokenService.isTokenExpired()) {
      const username = this.tokenService.getUsername();
      
       this.messageService.add({
        severity: 'info',
        summary: 'Already Logged In',
        detail: `Dear ${username}, you are already logged in.`,
        life: 4000
      });
      
      // this.router.navigate(['/']);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    }
    
  }

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: (res) => {
        // Save token
        this.storageService.setLocalStorage('token', res.token);

        // Save refresh token
        this.storageService.setLocalStorage('refreshToken', res.tokenInfo.refreshToken);

        // Save user info
        const userInfo: User = {
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          roles: [],
          token: res.token
        };
        this.storageService.setLocalStorage('user', userInfo);

        this.router.navigate(['/']);
      },
      error: () => (this.error = 'Invalid username or password'),
    });
  }

  loginWithGoogle() {
    window.location.href = 'https://localhost:7158/api/Auth/external-login?provider=Google&returnUrl=http://localhost:4200/auth/google-callback';
  }
}
