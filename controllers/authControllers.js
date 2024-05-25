import {
  createUser,
  findExistUser,
  updateSubscription,
  updateUser,
} from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

export const register = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const existUser = await findExistUser({ email });

  if (existUser) {
    throw HttpError(409, "User with this email already exist");
  }

  const newUser = await createUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await findExistUser({ email });
  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await compareHash(password, existingUser.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = existingUser;
  const payload = {
    id,
  };

  const token = createToken(payload);

  await updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email,
      password,
    },
  });
});

export const getCurrent = ctrlWrapper((req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

export const logout = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: "" });

  res.status(204).send();
});

export const changeSubscription = ctrlWrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateSubscription({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(404, "User with id ${_id} not found");
  }
  res.json(result);
});
