import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressBookService } from '../../services/address-book.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  private addressBookService = inject(AddressBookService);
  contacts = signal(this.addressBookService.getContacts());
  showForm = signal(false);
  selectedContact: any = null;

  addNewContact() {
    this.selectedContact = { fullName: '', phoneNumber: '', address: '', city: '', state: '', zipCode: '' };
    this.showForm.set(true);
  }

  editContact(contact: any) {
    this.selectedContact = { ...contact };
    this.showForm.set(true);
  }

  deleteContact(index: number) {
    this.addressBookService.deleteContact(index);
    this.contacts.set(this.addressBookService.getContacts());
  }

  saveContact(contact: any) {
    if (this.selectedContact && this.contacts().includes(this.selectedContact)) {
      const index = this.contacts().indexOf(this.selectedContact);
      this.addressBookService.updateContact(index, contact);
    } else {
      this.addressBookService.addContact(contact);
    }
    this.showForm.set(false);
    this.contacts.set(this.addressBookService.getContacts());
  }
}
