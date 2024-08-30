import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../app/models/contact.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'http://localhost:5103/api/Contacts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper method to create headers with the JWT token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve the token from AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Add the Authorization header with the token
    });
  }
    
  // Method to get all contacts with optional search
  getContacts(search?: string): Observable<Contact[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Contact[]>(this.apiUrl, { headers: this.getHeaders(), params });
  }

  // Method to get a specific contact by ID
  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Method to add a new contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, { headers: this.getHeaders() });
  }

  // Method to update an existing contact
  updateContact(id: string, contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact, { headers: this.getHeaders() });
  }

  // Method to delete a contact by ID
  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
