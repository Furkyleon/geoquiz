import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/users/register",
                form
            );
            if (response.status === 201) {
                navigate("/login"); // Redirect to login page after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-xl"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
