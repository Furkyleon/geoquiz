const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/start', quizController.startQuiz);
router.post('/submit', quizController.submitQuiz);
router.get('/history/:userId', quizController.getUserHistory);
router.get('/leaderboard', quizController.getLeaderboard);

module.exports = router;