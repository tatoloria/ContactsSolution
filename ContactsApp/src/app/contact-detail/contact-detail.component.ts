import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../app/models/contact.model';  // Import the Contact model correctly
import { ContactsService } from '../../services/contacts.service';  // Import the ContactsService from the correct location

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactsService.getContact(id).subscribe((data: Contact) => {
        this.contact = data;
      });
    }
  }
}
