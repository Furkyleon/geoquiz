import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/quiz/leaderboard", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(setLeaderboard)
            .catch((err) => console.error("Failed to fetch leaderboard", err));
    }, []);

    const handleStartQuiz = () => {
        if (user) {
            navigate("/quiz");
        } else {
            alert("Please login to start the quiz.");
            navigate("/login");
        }
    };

    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
            <p className="mb-6">Test your knowledge by starting a quiz!</p>
            <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mb-8"
            >
                Start Quiz
            </button>

            <div className="max-w-xl mx-auto mt-8 text-left">
                <h2 className="text-xl font-semibold mb-4">🏆 Leaderboard</h2>
                {leaderboard.length === 0 ? (
                    <p>No scores yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {leaderboard.map((entry, index) => (
                            <li
                                key={entry._id}
                                className="p-3 bg-gray-100 rounded-xl flex justify-between items-center"
                            >
                                <span>#{index + 1} </span>
                                <span>User: {entry.username} </span>
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

export default Home;
