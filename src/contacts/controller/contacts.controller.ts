import { Controller, Get, Post, Put, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ContactsService } from '../contacts.service';
import { Contacts } from '../interface/contacts.interface';


@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}


  @Get()
  getContacts(): Contacts[] {
    return this.contactsService.getAllContacts();
  }


  @Get(':uuid')
  getContact(@Param('uuid') uuid: string): Contacts {
    const contact = this.contactsService.getContact(uuid);
    if (!contact) {
      throw new NotFoundException(`Usuario no encontrado ${uuid}`);
    }
    return contact;
  }


  @Post()
  createContact(@Body() contact: Contacts): Contacts {
    const createdContact = this.contactsService.createContact(contact);
    return createdContact;
  }

  @Delete(':uuid')
  deleteContact(@Param('uuid') uuid: string): boolean {
    const deletedContact = this.contactsService.deleteContact(uuid);
    if (!deletedContact) {
      throw new NotFoundException(`Usuario no encontrado f  ${uuid}`);
    }
    return true;
  }

  @Put(':uuid')
  updateContact(@Param('uuid') uuid: string, @Body() contact: Contacts): Contacts {
    const updatedContact = this.contactsService.updateContact(uuid, contact);
    return updatedContact;
  }  


  @Patch(':uuid')
  patchContact(@Param('uuid') uuid: string, @Body() fieldsToUpdate: Partial<Contacts>): Contacts {
    const patchContact = this.contactsService.patchContacts(uuid, fieldsToUpdate);
    if (!patchContact) {
      throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
    }
    return patchContact;
  }

}
