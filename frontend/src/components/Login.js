import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Login() {
    const userContext = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/users/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.user) {
                userContext.setUserContext(data.user);
            } else {
                throw new Error(data.message || "Invalid login");
            }
        } catch (err) {
            setUsername("");
            setPassword("");
            setError(err.message);
        }
    }

    if (userContext.user) {
        return <Navigate replace to="/" />;
    }

    return (
        <form
            onSubmit={handleLogin}
            className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow"
        >
            <h2 className="text-xl font-bold mb-4">Login</h2>
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
            <input
                type="submit"
                value="Log in"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
            />
            {error && (
                <label className="text-red-500 block mt-2">{error}</label>
            )}
        </form>
    );
}

export default Login;
