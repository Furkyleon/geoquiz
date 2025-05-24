const Question = require("../models/questionModel");
const QuizAttempt = require("../models/quizModel");

module.exports = {
    startQuiz: async function (req, res) {
        try {
            const questions = await Question.aggregate([
                { $sample: { size: 10 } },
            ]);
            res.json(questions);
        } catch (err) {
            res.status(500).json({
                message: "Failed to start quiz",
                error: err.message,
            });
        }
    },

    submitQuiz: async function (req, res) {
        const { userId, responses } = req.body;
        try {
            let totalScore = 0;
            const detailedResults = responses.map((q) => {
                const grade = q.correct ? 1 : 0;
                const n = 100 * grade;
                const k = 0.2;
                const t = q.time;
                const score = n * Math.exp(-k * t);
                totalScore += score;
                return {
                    questionId: q.questionId,
                    userAnswer: q.userAnswer,
                    grade,
                    time: t,
                    score,
                };
            });

            const attempt = new QuizAttempt({
                userId,
                questions: detailedResults,
                totalScore,
            });

            await attempt.save();
            res.status(201).json({
                message: "Quiz submitted successfully",
                totalScore,
            });
        } catch (err) {
            res.status(500).json({
                message: "Error submitting quiz",
                error: err.message,
            });
        }
    },

    getUserHistory: async function (req, res) {
        const userId = req.params.userId;
        try {
            const history = await QuizAttempt.find({ userId }).populate(
                "questions.questionId"
            );
            res.json(history);
        } catch (err) {
            res.status(500).json({
                message: "Failed to fetch history",
                error: err.message,
            });
        }
    },
    getLeaderboard: async function (req, res) {
        try {
            const topScores = await QuizAttempt.aggregate([
                {
                    $group: {
                        _id: "$userId",
                        highestScore: { $max: "$totalScore" },
                    },
                },
                {
                    $sort: { highestScore: -1 },
                },
                {
                    $limit: 10,
                },
            ]);

            res.json(topScores);
        } catch (err) {
            res.status(500).json({
                message: "Failed to fetch leaderboard",
                error: err.message,
            });
        }
    },
};
