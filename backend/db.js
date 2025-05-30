const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/quiz-database";

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connected to MongoDB successfully");
});

module.exports = { db, mongoDB };
