import Joi from "joi";
import { emailRegexp } from "../constants/constants.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const authEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
