import {Schema, model} from 'mongoose';
import {handleMongooseErr, setSettingsUpdate} from "./hooks.js";

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
  }, {versionKey: false, timestamps: true}
);

contactSchema.post("save", handleMongooseErr);

contactSchema.pre("findOneAndUpdate", setSettingsUpdate);

contactSchema.post("findOneAndUpdate", handleMongooseErr);

const Contact = model("contact", contactSchema);

export default Contact;
