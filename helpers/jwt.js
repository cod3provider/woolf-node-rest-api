import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {JWT_SECRET_KEY} = process.env;

export const createToken = payload => jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: "1d"});

export const verifyToken = token => jwt.verify(token, JWT_SECRET_KEY);
