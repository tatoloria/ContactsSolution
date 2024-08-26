import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Login route
  { path: 'register', component: RegisterComponent },  // Register route
  { path: 'contacts', component: ContactsListComponent },  // Contacts list route
  { path: 'contact/:id', component: ContactDetailComponent },  // Contact detail route
  { path: 'add-contact', component: ContactFormComponent },  // Add contact route
  { path: 'edit-contact/:id', component: ContactFormComponent },  // Edit contact route
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring the router module with your routes
  exports: [RouterModule]  // Exporting RouterModule so it can be used throughout your application
})
export class AppRoutingModule { }
