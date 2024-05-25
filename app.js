import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const { DB_URL } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Database connection successful. Server is running. Use our API on port: 3000",
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
