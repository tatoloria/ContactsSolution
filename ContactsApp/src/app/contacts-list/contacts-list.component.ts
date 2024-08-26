import { Component, OnInit } from '@angular/core';
import { ContactsService, Contact } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactsService.deleteContact(id).subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== id);
      });
    }
  }
}
