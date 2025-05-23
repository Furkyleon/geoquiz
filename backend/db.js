const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/quiz-database";

// Connect with options for modern Mongoose compatibility
mongoose.connect(mongoDB);

// Set global Promise
mongoose.Promise = global.Promise;

// Bind connection to event handlers
const db = mongoose.connection;

db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connected to MongoDB successfully");
});

module.exports = { db, mongoDB };
