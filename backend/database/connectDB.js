const mongoose = require("mongoose");
const dbURI = process.env.DB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "test";

const connectDB = async () => {
  mongoose.connect(dbURI, { dbName: dbName });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Disconnected from MongoDB");
  });
};

module.exports = connectDB;
