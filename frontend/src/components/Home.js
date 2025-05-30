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
        <div className="container text-center home-page">
            <h1 className="heading">
                {user
                    ? `Welcome to GeoQuiz, ${user.username}!`
                    : "Welcome to GeoQuiz!"}
            </h1>
            <p>Test your geography knowledge with 10 questions!</p>
            <button onClick={handleStartQuiz} className="button button-primary start-quiz">
                Start Quiz
            </button>

            <div className="card" style={{ marginTop: "2rem" }}>
                <h2 className="heading">🏆 Leaderboard</h2>
                {leaderboard.length === 0 ? (
                    <p>No scores yet.</p>
                ) : (
                    <ul className="leaderboard">
                        {leaderboard.map((entry, i) => {
                            const isCurrent =
                                user && entry.username === user.username;
                            return (
                                <li
                                    key={entry._id}
                                    className={`leaderboard_item ${
                                        isCurrent ? "current" : ""
                                    }`}
                                >
                                    <span>#{i + 1}</span>
                                    <span>{entry.username}</span>
                                    <span>
                                        {Math.round(entry.highestScore)} pts
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
