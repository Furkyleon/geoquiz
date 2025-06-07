import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizResult() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.answers) {
        navigate("/");
        return null;
    }

    const { totalScore, answers } = state;
    const totalQuestions = answers.length;
    const correctCount = answers.filter((a) => a.correct).length;
    const wrongCount = totalQuestions - correctCount;
    const totalTimeSec = answers.reduce((sum, a) => sum + a.time, 0);
    const formatTime = (secs) => `${secs.toFixed(1)}s`;

    return (
        <div className="container quiz-result">
            <div className="card quiz-result-card">
                <h2 className="heading">Quiz Result</h2>

                <h3 className="quiz-score">Score: {Math.round(totalScore)}</h3>

                <p>
                    <strong>Correct:</strong> {correctCount} / {totalQuestions}
                </p>
                <p>
                    <strong>Wrong:</strong> {wrongCount} / {totalQuestions}
                </p>
                <p>
                    <strong>Time Taken:</strong> {formatTime(totalTimeSec)}
                </p>

                <button
                    className="button button-primary"
                    onClick={() => navigate("/quiz-history")}
                >
                    View Quiz History
                </button>
            </div>
        </div>
    );
}
