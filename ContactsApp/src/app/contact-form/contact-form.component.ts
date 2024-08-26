import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService, Contact } from '../../services/contacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'; // Import the AuthService to get the userId

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = { id: '', name: '', phoneNumber: '', userId: '' };
  isEditMode = false;

  constructor(
    private contactsService: ContactsService,
    private authService: AuthService, // Inject AuthService to get the userId
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.authService.getUserId(); // Assume AuthService has a method to get the userId
    if (userId) {
      this.contact.userId = userId;
    }

    if (id) {
      this.isEditMode = true;
      this.contactsService.getContact(id).subscribe(data => {
        this.contact = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.contactsService.updateContact(this.contact.id, this.contact).subscribe(() => {
        this.snackBar.open('Contact updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactsService.addContact(this.contact).subscribe(() => {
        this.snackBar.open('Contact added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/contacts']);
      });
    }
  }
}
