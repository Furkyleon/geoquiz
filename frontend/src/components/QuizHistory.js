import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function QuizHistory() {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3001/quiz/history/${user.id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(setHistory)
            .catch((err) => {
                console.error("Failed to fetch quiz history", err);
            });
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Your Quiz History</h2>
            {history.length === 0 ? (
                <p>No quiz attempts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((attempt, index) => (
                        <li
                            key={index}
                            className="p-4 border rounded-xl shadow-sm bg-gray-50"
                        >
                            <div>
                                <strong>Date:</strong>{" "}
                                {new Date(attempt.date).toLocaleString()}
                            </div>
                            <div>
                                <strong>Score:</strong>{" "}
                                {Math.round(attempt.totalScore)}
                            </div>
                            <div>
                                <strong>Questions:</strong>{" "}
                                {attempt.questions.length}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default QuizHistory;
