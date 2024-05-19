import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateContactStatusById
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const {id} = req.params;
  const contactById = await getContactById(id);
  if (!contactById) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(contactById);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const {id} = req.params;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    throw HttpError(400, `Contact with id ${id} not found`);
  }

  res.json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const {id} = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(400, `Contact with id ${id} not found`);
  }

  res.json(result);
});

export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const {id} = req.params;
  const result = await updateContactStatusById(id, req.body);
  if (!result) {
    throw HttpError(400, `Contact with id ${id} not found`);
  }

  res.json(result);
})
