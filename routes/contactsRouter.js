import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContactById,
  createContact,
  updateContactById,
  updateStatusContactById,
} from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  createContact,
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  updateContactById,
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteContactSchema),
  updateStatusContactById,
);

export default contactsRouter;
