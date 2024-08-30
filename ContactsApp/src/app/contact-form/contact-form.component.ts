import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { AuthService } from '../../services/auth.service';
import { Contact } from '../../app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact = {
    id: '',
    name: '',
    phoneNumber: '',
    userId: ''
  };
  isEditMode = false;
  errorMessage: string = '';  // Property to hold the error message

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Retrieve the contact ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');

    // Check if the form is in edit mode by verifying if the contact ID is provided
    if (id) {
      this.isEditMode = true;
      this.contactsService.getContact(id).subscribe({
        next: (data: Contact) => {
          this.contact = data;
        },
        error: (err: any) => {
          this.errorMessage = 'Failed to load contact details. Please try again.';
          console.error(err);
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = ''; // Clear any previous error messages

    if (this.isEditMode) {
      this.contactsService.updateContact(this.contact.id, this.contact).subscribe({
        next: () => {
          alert('Contact updated successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err: any) => {
          try {
            const errorResponse = JSON.parse(err.error);
            this.errorMessage = errorResponse.message || 'Failed to update contact. Please try again.';
          } catch {
            this.errorMessage = err.error?.message || 'Failed to update contact. Please try again.';
          }
        }
      });
    } else {

      // avoid issues
      this.contact.id = this.authService.getUserId() || '';

      // Set the userId from the AuthService
      this.contact.userId = this.authService.getUserId() || '';   

      this.contactsService.addContact(this.contact).subscribe({
        next: () => {
          alert('Contact added successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err: any) => {
          try {
            const errorResponse = JSON.parse(err.error);
            this.errorMessage = errorResponse.message || 'Failed to add contact. Please try again.';
          } catch {
            this.errorMessage = err.error?.message || 'Failed to add contact. Please try again.';
          }
        }
      });
    }
  }
}
