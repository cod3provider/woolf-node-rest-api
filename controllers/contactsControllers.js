// import contactsService from "../services/contactsServices.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {createContactSchema, updateContactSchema} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  }
  catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const {id} = req.params;
    const contactById = await getContactById(id);
    if (!contactById) {
      // const err = new Error(`Contact with id=${id} not found`)
      // err.status = 404;
      // throw err;
      throw HttpError(404, `Contact with id ${id} not found`);
    }
    res.json(contactById);
  }
  catch (err) {
    // const {status = 500, message = "Server err"} = err;
    // res.status(status).json({
    //   message,
    // })
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedContact = await removeContact(id);
    if (!deletedContact) {
      throw HttpError(400, `Contact with id ${id} not found`);
    }

    res.json(deletedContact);
  }
  catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const {error} = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    // console.log(req.body)
    const result = await addContact(req.body);
    // console.log(result)
    res.status(201).json(result);
  }
  catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const {error} = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const {id} = req.params;
    const result = await updateContactById(id, req.body);
    if(!result) {
      throw HttpError(400, `Contact with id ${id} not found`);
    }

    res.json(result);
  }
  catch (err) {
    next(err);
  }
};
