import Contact from "../models/Contact.js";

export function listContacts(search = {}) {
  const { filter = {}, fields = "", params = {} } = search;
  return Contact.find(filter, fields, params);
}

export function getContact(filter) {
  return Contact.findOne(filter);
}

export function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

export function addContact(body) {
  return Contact.create(body);
}

export function updateContact(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}

export function updateContactStatus(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}
