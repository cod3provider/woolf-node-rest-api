import {Schema, model} from 'mongoose';
import {handleSaveError, setSettingsUpdate} from "./hooks.js";

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    }
  }, {versionKey: false, timestamps: true}
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setSettingsUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
