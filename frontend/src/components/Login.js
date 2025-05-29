import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Login() {
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

    if (user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full mb-3 px-3 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-3 px-3 py-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Log in
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <div className="mt-4 text-center">
                <a
                    href="http://localhost:3001/auth/github"
                    className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                    Log in with GitHub
                </a>
            </div>
        </div>
    );
}

export default Login;
