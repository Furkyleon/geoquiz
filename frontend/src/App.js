import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./contexts/userContext";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import AuthSuccess from "./components/AuthSuccess";
import Register from "./components/Register";
import Profile from "./components/Profile";
import QuizPage from "./components/QuizPage";
import QuizHistory from "./components/QuizHistory";
import QuizResult from "./components/QuizResult";

function App() {
    const storedToken = localStorage.getItem("quizAppToken");
    const [token, setToken] = useState(storedToken);
    const [user, setUser] = useState(
        storedToken ? jwtDecode(storedToken) : null
    );

    const setUserContext = ({ user, token }) => {
        localStorage.setItem("quizAppToken", token);
        setUser(user);
        setToken(token);
    };

    const clearUser = () => {
        localStorage.removeItem("quizAppToken");
        setUser(null);
        setToken(null);
    };

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ user, token, setUserContext, clearUser }}
            >
                <div className="App">
                    <Header title="GeoQuiz" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/auth/success" element={<AuthSuccess />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/quiz" element={<QuizPage />} />
                        <Route path="/quiz-history" element={<QuizHistory />} />
                        <Route path="/quiz-result" element={<QuizResult />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
