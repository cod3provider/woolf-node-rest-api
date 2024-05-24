import {createUser, findExistUser} from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import {createToken} from "../helpers/jwt.js";

export const register = ctrlWrapper(async (req,res) => {
  const {email} = req.body;
  const existUser = await findExistUser({email});

  if(existUser) {
    throw HttpError(409, 'User with this email already exist');
  }

  const newUser = await createUser(req.body);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  })
})

export const login = ctrlWrapper(async (req,res) =>{
  const {email, password} = req.body;
  const existingUser = await findExistUser({email});
  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await compareHash(password, existingUser.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const {_id: id} = existingUser;
  const payload = {
    id,
  };

  const token = createToken(payload);

  res.json({
    token
  })
})
