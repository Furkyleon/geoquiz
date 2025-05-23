const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizAttemptSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    questions: [
        {
            questionId: { type: Schema.Types.ObjectId, ref: "question" },
            userAnswer: String,
            grade: Number,
            time: Number,
            score: Number,
        },
    ],
    totalScore: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("quiz-attempt", quizAttemptSchema);
