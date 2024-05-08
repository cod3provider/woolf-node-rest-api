// import contactsService from "../services/contactsServices.js";

import {addContact, getContactById, listContacts} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
};

export const getOneContact = async (req, res) => {
  try {
    const {id} = req.params;
    const contactById = await getContactById(id);
    if (!contactById) {
      return res.status(404).json({
        message: `Contact with id ${id} not found`
      })
    }
    res.json(contactById);
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
};

export const deleteContact = async (req, res) => {
};

export const createContact = async (req, res) => {
  try {
    console.log(req.body)
    const result = await addContact(req.body);
    console.log(result)
    res.status(201).json(result);
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
};

export const updateContact = async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
};
