import express from "express";
import validateBody from "../helpers/validateBody.js";
import {authSigninSchema, authSignupSchema} from "../schemas/authSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {createUser} from "../services/authServices.js";
import {signup} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authSignupSchema), signup);

// authRouter.post("signin", isEmptyBody, validateBody(authSigninSchema));

export default authRouter;
