import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function QuizPage() {
    const { user, token } = useContext(UserContext);
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
        if (quizComplete) submitQuiz();
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
        if (current + 1 < questions.length) setCurrent(current + 1);
        else setQuizComplete(true);
    };

    const submitQuiz = async () => {
        if (!user || !token) {
            alert("Please log in to submit your quiz.");
            navigate("/login");
            return;
        }
        try {
            const res = await fetch("http://localhost:3001/quiz/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ responses: answers }),
            });
            const data = await res.json();
            alert(`Quiz submitted! Score: ${Math.round(data.totalScore)}`);
            navigate("/quiz-history");
        } catch (err) {
            console.error("Submit failed", err);
        }
    };

    if (!questions.length)
        return (
            <div className="container text-center">
                <p>Loading questions...</p>
            </div>
        );

    const q = questions[current];
    const options = [...q.incorrect_answers, q.correct_answer].sort();

    return (
        <div className="container card">
            <h2 className="heading">
                Question {current + 1} of {questions.length}
            </h2>
            <p
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: q.question }}
            />
            <div className="form">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="button button--primary"
                        style={{ width: "100%" }}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
