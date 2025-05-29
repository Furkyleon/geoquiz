import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/quiz/leaderboard")
            .then((res) => res.json())
            .then(setLeaderboard)
            .catch((err) => console.error("Failed to fetch leaderboard", err));
    }, []);

    const handleStartQuiz = () => {
        if (user) navigate("/quiz");
        else {
            alert("Please login to start the quiz.");
            navigate("/login");
        }
    };

    return (
        <div className="container text-center">
            <h1 className="heading">Welcome to the Quiz App</h1>
            <p>Test your knowledge by starting a quiz!</p>
            <button
                onClick={handleStartQuiz}
                className="button button--primary"
                style={{ marginTop: "1rem" }}
            >
                Start Quiz
            </button>
            <div className="card" style={{ marginTop: "2rem" }}>
                <h2 className="heading">🏆 Leaderboard</h2>
                {leaderboard.length === 0 ? (
                    <p>No scores yet.</p>
                ) : (
                    <ul className="leaderboard">
                        {leaderboard.map((entry, i) => (
                            <li key={entry._id} className="leaderboard__item">
                                <span>#{i + 1}</span>
                                <span>{entry.username}</span>
                                <span className="font-bold">
                                    {Math.round(entry.highestScore)} pts
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
