import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../app/models/contact.model';  // Corrected import path for Contact model

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  searchQuery: string = '';

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts(this.searchQuery).subscribe((data: Contact[]) => {  // Explicitly type data as an array of Contact
      this.contacts = data;
    });
  }


  onSearch(): void {
    this.loadContacts();  // Reload contacts based on the search query
  }

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactsService.deleteContact(id).subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== id);
      });
    }
  }
}
