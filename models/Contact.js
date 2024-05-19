import {Schema, model} from 'mongoose';

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
  }, {versionKey: false, timestamps: false}
);

contactSchema.post('save', (error, data, next) => {
  error.status = 400;
  next();
});

const Contact = model("contact", contactSchema);

export default Contact;
