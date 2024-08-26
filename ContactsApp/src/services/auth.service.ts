import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7177/api/Users';  // Replace with your actual API URL
  private userIdKey = 'userId';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  // Method for user login
  login(username: string, password: string): Observable<{ token: string, userId: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    return this.http.post<{ token: string, userId: string }>(`${this.apiUrl}/login`, body, { headers });
  }

  // Method for user registration
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers, responseType: 'text' });
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
  }

  // Method to retrieve the stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to store the token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Method to store the userId
  setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  // Method to retrieve the stored userId
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
