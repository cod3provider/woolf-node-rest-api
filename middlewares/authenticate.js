import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findExistUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = verifyToken(token);
    const user = await findExistUser({ _id: id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    if (!user.token) {
      return next(HttpError(401, "Your session expired"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401, err.message));
  }
};

export default authenticate;
