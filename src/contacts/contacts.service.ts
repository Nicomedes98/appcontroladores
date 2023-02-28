import { Injectable, NotFoundException } from '@nestjs/common';

import { Contacts } from './interface/contacts.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactsService {
  private contacts: Contacts[] = [
  {
    uuid: '1',
    usuarioUuid: '1',
    nombre: 'Jhon',
    apellido: 'Rambo',
    telefono: '0912458694',
    correo: 'jrambo@gmail.com',
  },
  {
    uuid: '3',
    usuarioUuid: '2',
    nombre: 'Ana',
    apellido: 'Rodriguez',
    telefono: '0912458694',
    correo: 'anarod@hotmail.com',
  },
  {
    uuid: '2',
    usuarioUuid: '3',
    nombre: 'Bart',
    apellido: 'Gonzales',
    telefono: '0912458694',
    correo: 'gonazabart@gmail.com',
  },


];

  getAllContacts(): Contacts[] {
    return this.contacts;
  }

  getContact(uuid: string): Contacts {
    const contact = this.contacts.find((c) => c.uuid === uuid);
    if (!contact) {
      throw new NotFoundException(`Contact with uuid ${uuid} not found`);
    }
    return contact;
  }

  createContact(contact: Contacts): Contacts {
    const newContactId = Math.random().toString(36).slice(-2);
    const newContact: Contacts = { ...contact, uuid: newContactId };
    this.contacts.push(newContact);
    return newContact;
  }
  
  

  updateContact(uuid: string, fieldsToUpdate: Partial<Contacts>): Contacts {
    const contact = this.getContact(uuid);
    const updatedContact = { ...contact, ...fieldsToUpdate };
    this.contacts[this.contacts.indexOf(contact)] = updatedContact;
    return updatedContact;
  }

  deleteContact(uuid: string): boolean {
    const contact = this.getContact(uuid);
    const index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
    return true;
  }
  
  patchContacts(uuid: string, fieldsToUpdate: Partial<Contacts>): Contacts {
    const existingContact = this.contacts.find(contact => contact.uuid === uuid);
    if (existingContact) {
      const updatedContact = { ...existingContact, ...fieldsToUpdate };
      this.contacts = this.contacts.map(contact => (contact.uuid === uuid ? updatedContact : contact));
      return updatedContact;
    }
    throw new NotFoundException(`Contacto no encontrado pa ${uuid}`);
  }
  
}
