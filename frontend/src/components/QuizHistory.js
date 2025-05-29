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

    if (!user) return null;

    return (
        <div className="container">
            <div className="card">
                <h2 className="heading">Your Quiz History</h2>
                {history.length === 0 ? (
                    <p>No quiz attempts yet.</p>
                ) : (
                    history.map((attempt, idx) => (
                        <div
                            key={idx}
                            className="card"
                            style={{ marginTop: "1rem" }}
                        >
                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(attempt.date).toLocaleString()}
                            </p>
                            <p>
                                <strong>Score:</strong>{" "}
                                {Math.round(attempt.totalScore)}
                            </p>
                            <p>
                                <strong>Questions:</strong>{" "}
                                {attempt.questions.length}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
