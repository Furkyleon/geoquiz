import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import Home from "./components/Home";
import Header from "./components/Header";
import Users from "./components/Users";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
    const [user, setUser] = useState(
        localStorage.user ? JSON.parse(localStorage.user) : null
    );

    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    };

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{
                    user: user,
                    setUserContext: updateUserData,
                }}
            >
                <div className="App">
                    <Header title="Quiz App" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
