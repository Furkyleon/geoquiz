// seedQuestions.js
const mongoose = require("mongoose");
const axios = require("axios");
const he = require("he");
const Question = require("./models/questionModel");
const { mongoDB } = require("./db");

// Connect to MongoDB
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Fetch and save questions
async function fetchAndSaveQuestions() {
    try {
        const response = await axios.get(
            "https://opentdb.com/api.php?amount=50&category=22&difficulty=medium&type=multiple"
        );
        const questions = response.data.results;

        const formatted = questions.map((q) => ({
            question: he.decode(q.question),
            correct_answer: he.decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((ans) => he.decode(ans)),
        }));

        await Question.insertMany(formatted);
        console.log("✅ Questions inserted successfully");
    } catch (err) {
        console.error("❌ Error fetching or inserting questions:", err);
    } finally {
        mongoose.disconnect();
    }
}

fetchAndSaveQuestions();
