import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

// Header component with logo and horizontal navigation
export default function Header({ title }) {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate("/");
    };

    const goTo = (path) => () => navigate(path);

    return (
        <header className="header">
            <div className="header_content">
                <div className="header_brand">
                    <img
                        src="/quiz-icon.png"
                        alt="Quiz App Logo"
                        className="header_logo"
                    />
                    <h1 className="header_title">{title}</h1>
                </div>
                <nav className="nav">
                    <ul className="nav_list">
                        <li>
                            <button
                                onClick={goTo("/")}
                                className="btn btn--primary"
                            >
                                Home
                            </button>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <button
                                        onClick={goTo("/profile")}
                                        className="btn btn--primary"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn--logout"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button
                                        onClick={goTo("/login")}
                                        className="btn btn--primary"
                                    >
                                        Login
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={goTo("/register")}
                                        className="btn btn--primary"
                                    >
                                        Register
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
