import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function QuizHistory() {
    const { user, token } = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }
        fetch(`http://localhost:3001/quiz/history/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) =>
                Array.isArray(data) ? setHistory(data) : setHistory([])
            )
            .catch((err) => {
                console.error("Failed to fetch history", err);
                setHistory([]);
            });
    }, [user, token, navigate]);

    const formatTime = (seconds) => `${seconds.toFixed(1)}s`;

    if (!user) return null;

    return (
        <div className="container quiz-history">
            <div className="card">
                <h2 className="heading text-center">Your Quiz History</h2>
                {history.length === 0 ? (
                    <p className="no-quiz">No quiz attempts yet.</p>
                ) : (
                    history.map((attempt, idx) => {
                        const totalQuestions = attempt.questions.length;
                        const correctCount = attempt.questions.filter(
                            (q) => q.grade === 1
                        ).length;
                        const wrongCount = totalQuestions - correctCount;
                        const totalTimeSec = attempt.questions.reduce(
                            (sum, q) => sum + q.time,
                            0
                        );

                        return (
                            <div
                                key={idx}
                                className="card"
                                style={{ marginTop: "1rem" }}
                            >
                                <h3 className="quiz-attempt-title">
                                    Quiz {idx + 1}:{" "}
                                    <span className="quiz-score">
                                        {Math.round(attempt.totalScore)} points
                                    </span>
                                </h3>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(attempt.date).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Correct:</strong> {correctCount} /{" "}
                                    {totalQuestions}
                                </p>
                                <p>
                                    <strong>Wrong:</strong> {wrongCount} /{" "}
                                    {totalQuestions}
                                </p>
                                <p>
                                    <strong>Time Taken:</strong>{" "}
                                    {formatTime(totalTimeSec)}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
