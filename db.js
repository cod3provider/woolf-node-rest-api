import mongoose from "mongoose";
import app from "./app.js";

const { DB_URL } = process.env;

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
