import { model, Schema } from "mongoose";
import { handleSaveError, setSettingsUpdate } from "./hooks.js";
import { emailRegexp } from "../constants/constants.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setSettingsUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
