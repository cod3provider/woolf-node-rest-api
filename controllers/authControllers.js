import {createUser} from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import {handleSaveError} from "../models/hooks.js";

export const signup = ctrlWrapper(async (req,res) => {
  const newUser = await createUser(req.body);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  })
})
