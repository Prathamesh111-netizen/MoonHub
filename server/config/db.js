const mongoose = require("mongoose");
const repository = require("../models/repository.model");

var db = null;
class database {
  constructor() {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) {
      throw new Error("MONGO_URL is not defined");
    }
    if (db) {
      return db;
    }
    this._connect();
    return db;
  }

  _connect() {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });

    db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    db.once("open", function () {
      console.log("We're connected!");
    });

    db.on("disconnected", function () {
      console.log("Mongoose default connection is disconnected");
    });

    db.repository = repository;
  }
}

module.exports = new database();
