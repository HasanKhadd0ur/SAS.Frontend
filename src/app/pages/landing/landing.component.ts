import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/layout/service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone:false,
})
export class LandingComponent {
    
    isLoggedIn = false;
    username: string | null = null;

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private authService: AuthenticationService,
        private userService: UserService) { }
    
    ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // e.g. check token presence
    if (this.isLoggedIn) {
      const user = this.userService.getCurrentUser(); // your implementation may vary
      this.username = user?.email || 'User'; // or display name
    }
  }

  logout() {
    this.authService.logout();
  }
}
