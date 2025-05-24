import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function QuizPage() {
    const { user } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [quizComplete, setQuizComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/quiz/start")
            .then((res) => res.json())
            .then(setQuestions)
            .catch((err) => console.error("Failed to load quiz", err));
    }, []);

    useEffect(() => {
        if (quizComplete) {
            submitQuiz();
        }
    }, [quizComplete]);

    const handleAnswer = (option) => {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        const question = questions[current];

        setAnswers((prev) => [
            ...prev,
            {
                questionId: question._id,
                userAnswer: option,
                correct: option === question.correct_answer,
                time: timeTaken,
            },
        ]);

        setStartTime(Date.now());

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setQuizComplete(true);
        }
    };

    const submitQuiz = async () => {
        if (!user || !user.id) {
            alert("User not logged in.");
            navigate("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userId: user.id, responses: answers }),
            });

            const data = await res.json();
            alert(`Quiz submitted! Score: ${Math.round(data.totalScore)}`);
            navigate("/quiz-history");
        } catch (err) {
            console.error("Submit failed", err);
        }
    };

    if (!questions.length) return <p>Loading questions...</p>;

    const q = questions[current];
    const options = [...q.incorrect_answers, q.correct_answer].sort();

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">
                Question {current + 1} of {questions.length}
            </h2>
            <p className="mb-4">{q.question}</p>
            <div className="space-y-2">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="block w-full text-left bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
