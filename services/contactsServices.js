import fs from 'fs/promises';
import path from 'path';
import {nanoid} from "nanoid";

import Contact from "../models/Contact.js";

// const contactsPath = path.resolve('db', 'contacts.json');
// const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// export async function listContacts() {
//   const contacts = await fs.readFile(contactsPath);
//   return JSON.parse(contacts);
// }
//
// export async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const foundContact = contacts.find(contact => contact.id === contactId);
//   return foundContact || null;
// }
//
// export async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex(contact => contact.id === contactId);
//
//   if (idx === -1) {
//     return null;
//   }
//
//   const [deletedContact] = contacts.splice(idx, 1);
//   await updateContacts(contacts);
//
//   return deletedContact;
// }
//
// export async function addContact(body) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body
//   }
//   contacts.push(newContact);
//   await updateContacts(contacts);
//
//   return newContact;
// }
//
// export async function updateContactById(contactId, data) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex(contact => contact.id === contactId);
//
//   if (idx === -1) {
//     return null;
//   }
//
//   contacts[idx] = {...contacts[idx], ...data};
//   await updateContacts(contacts);
//
//   return contacts[idx];
// }

export async function listContacts() {
  return Contact.find();
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(body) {
  return Contact.create(body);
}

export async function updateContactById(contactId, data) {

}

export async function updateContactStatusById(contactId, data) {
  return Contact.findOneAndUpdate(contactId, data);
}
