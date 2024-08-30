import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5103/api/Users';

  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {

    // Initialize with the stored username if available
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSubject.next(storedUsername);
    }
  }

  // Method for user registration
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers, responseType: 'text' });
  }

  // Method to handle user login
  login(username: string, password: string): Observable<{ token: string, userId: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/login`, body, { headers });
  }  

  // Method to save the JWT token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Method to retrieve the JWT token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Method to check if is Authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Return true if there's a token, false otherwise
  }

  // Method to save the username
  setUsername(username: string): void {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }

  // Method to get the username as an observable
  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  // Method to save the userId
  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Method to retrieve the userId
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Method to handle user logout
  logout(): void {
    this.usernameSubject.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}
