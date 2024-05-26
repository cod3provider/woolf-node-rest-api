import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authLoginSchema,
  authRegisterSchema,
  subscriptionSchema,
} from "../schemas/authSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
  register,
  login,
  getCurrent,
  logout,
  changeSubscription,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatarURL"),
  isEmptyBody,
  validateBody(authRegisterSchema),
  register,
);

authRouter.post("/login", isEmptyBody, validateBody(authLoginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/:id/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  changeSubscription,
);

export default authRouter;
