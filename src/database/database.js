const mongoose = require("mongoose");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const MONGODB_URI = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

const database = async () => {
  try {
    const conn = await mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`Connected to Mongo on ${process.env.NODE_ENV}`))
      .catch((err) => console.log("Error to Connect Mongo", err.message));
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = database;
