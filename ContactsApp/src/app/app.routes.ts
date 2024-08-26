import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactsListComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'add-contact', component: ContactFormComponent },
  { path: 'edit-contact/:id', component: ContactFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
