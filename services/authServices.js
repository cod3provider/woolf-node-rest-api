import User from "../models/User.js";
import bcrypt from "bcrypt";

export const findExistUser = filter => User.findOne(filter);

export const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({...data, password: hashPassword});
};
