import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable to store error messages

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.errorMessage = ''; // Clear any previous error messages

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Save the JWT token and userId received from the server
        this.authService.setToken(response.token);
        this.authService.setUserId(response.userId);

        // Navigate to the contacts page after successful login
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });
  }
}
