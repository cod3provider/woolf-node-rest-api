import Contact from "../models/Contact.js";

export function listContacts() {
  return Contact.find({}, "-createdAt -updatedAt");
}

export async function getContactById(contactId) {
  const result = await Contact.findById(contactId);
  return result;
}

export function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(body) {
  return Contact.create(body);
}

export function updateContactById(contactId, data) {
  return Contact.findByIdAndUpdate(contactId, data);
}

export async function updateContactStatusById(contactId, data) {
  return Contact.findByIdAndUpdate(contactId, data);
}
