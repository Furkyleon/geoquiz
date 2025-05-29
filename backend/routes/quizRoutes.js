const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const quizController = require("../controllers/quizController");

router.get("/start", quizController.startQuiz);
router.post("/submit", auth, quizController.submitQuiz);
router.get("/history/:userId", auth, quizController.getUserHistory);
router.get("/leaderboard", quizController.getLeaderboard);

module.exports = router;
