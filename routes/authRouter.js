import express from "express";
import validateBody from "../helpers/validateBody.js";
import {authSigninSchema, authSignupSchema} from "../schemas/authSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {register, login} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authSignupSchema), register);

authRouter.post("/login", isEmptyBody, validateBody(authSigninSchema), login);

export default authRouter;
