import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import {
  createUser,
  findExistUser,
  updateAvatar,
  updateSubscription,
  updateUser,
} from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const avatarPath = path.resolve("public", "avatars");

export const register = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  const existUser = await findExistUser({ email });
  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);

  if (existUser) {
    throw HttpError(409, "User with this email already exist");
  }

  const verificationToken = nanoid();

  const newUser = await createUser({
    ...req.body,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
});

export const verifyUser = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findExistUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await updateUser({ _id: user._id }, { verify: true, verificationToken: "" });

  res.json({
    message: "Verification successful",
  });
});

export const resendVerify = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await findExistUser({ email });
  if (!user) {
    throw HttpError(404, "User with this email not found");
  }

  if (user.verify) {
    throw HttpError(400, "User with this email already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Resent verification email",
  });
});

export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await findExistUser({ email });

  console.log(existingUser);
  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!existingUser.verify) {
    throw HttpError(401, "Email not verified");
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
      subscription: existingUser.subscription,
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

export const changeAvatar = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Image file not found");
  }
  const { path: oldPath, filename } = req.file;
  console.log(oldPath);

  const newPath = path.join(avatarPath, filename);

  const avatar = await Jimp.read(oldPath);
  avatar.cover(250, 250).write(newPath);
  fs.unlink(oldPath);

  const avatarURL = path.join("avatars", filename);
  const result = await updateAvatar(_id, { avatarURL });
  console.log(result);

  res.json({ avatarURL: result.avatarURL });
});
