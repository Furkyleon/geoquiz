import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/users/register",
                form
            );
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container card register-page">
            <h2 className="heading text-center">Register</h2>
            {error && <div className="error text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form_group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="form_input"
                        required
                    />
                </div>
                <div className="form_group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="form_input"
                        required
                    />
                </div>
                <div className="form_group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="form_input"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="button button-primary register"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
