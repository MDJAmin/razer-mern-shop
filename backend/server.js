import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
