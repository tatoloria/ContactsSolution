import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Contact Management App';
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // Subscribe to username changes
    this.authService.getUsername().subscribe({
      next: (username) => {
        this.username = username;
      }
    });

  }

  onLogout(): void {
    this.username = '';
    this.authService.logout();    

    this.router.navigate(['/login']);
  }
}
