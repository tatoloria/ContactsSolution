import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://localhost:44359/api/Contacts';

  constructor(private http: HttpClient) {
    console.log('ContactsService is being instantiated');
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: string, contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
