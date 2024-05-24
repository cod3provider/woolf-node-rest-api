import User from "../models/User.js";

export const createUser = data => User.create(data);
