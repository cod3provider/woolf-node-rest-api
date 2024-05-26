import {
  addContact,
  getContact,
  listContacts,
  removeContact,
  updateContact,
  updateContactStatus,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const fields = "-createdAt -updatedAt";
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const params = { skip, limit };
  const contacts = await listContacts({ filter, fields, params });
  res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await getContact({ _id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id ${_id} not found`);
  }
  res.json(result);
});

export const deleteContactById = ctrlWrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const deletedContact = await removeContact({ _id, owner });
  if (!deletedContact) {
    throw HttpError(400, `Contact with id ${_id} not found`);
  }

  res.json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const result = await addContact({ ...req.body, owner });
  res.status(201).json(result);
});

export const updateContactById = ctrlWrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateContact({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(400, `Contact with id ${_id} not found`);
  }

  res.json(result);
});

export const updateStatusContactById = ctrlWrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateContactStatus({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id ${_id} not found`);
  }

  res.json(result);
});
