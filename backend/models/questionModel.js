const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
});

module.exports = mongoose.model("question", questionSchema);
