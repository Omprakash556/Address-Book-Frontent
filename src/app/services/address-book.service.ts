import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private contacts = signal<any[]>([]);

  getContacts() {
    return this.contacts();
  }

  addContact(contact: any) {
    this.contacts.set([...this.contacts(), contact]);
  }

  updateContact(index: number, contact: any) {
    const updatedContacts = [...this.contacts()];
    updatedContacts[index] = contact;
    this.contacts.set(updatedContacts);
  }

  deleteContact(index: number) {
    const updatedContacts = [...this.contacts()];
    updatedContacts.splice(index, 1);
    this.contacts.set(updatedContacts);
  }
}
