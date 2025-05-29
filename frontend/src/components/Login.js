import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Login() {
    const { user, setUserContext } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                setUserContext({ user: data.user, token: data.token });
                navigate("/");
            } else {
                throw new Error(data.message || "Invalid login");
            }
        } catch (err) {
            setUsername("");
            setPassword("");
            setError(err.message);
        }
    }

    if (user) return <Navigate replace to="/" />;

    return (
        <div className="container card">
            <h2 className="heading text-center">Login</h2>
            <form onSubmit={handleLogin} className="form">
                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form__input"
                        required
                    />
                </div>
                <div className="form__group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form__input"
                        required
                    />
                </div>
                <button type="submit" className="button button--primary">
                    Log in
                </button>
                {error && <div className="error text-center">{error}</div>}
            </form>
            <div className="text-center" style={{ marginTop: "1rem" }}>
                <a
                    href="http://localhost:3001/auth/github"
                    className="button button--secondary"
                >
                    Log in with GitHub
                </a>
            </div>
        </div>
    );
}
