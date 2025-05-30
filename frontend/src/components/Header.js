import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

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
                <Link to="/" className="header_brand">
                    <img
                        src="/quiz-icon.png"
                        alt="GeoQuiz"
                        className="header_logo"
                    />
                    <h1 className="header_title">{title}</h1>
                </Link>
                <nav className="nav">
                    <ul className="nav_list">
                        {user ? (
                            <>
                                <li>
                                    <button
                                        onClick={goTo("/profile")}
                                        className="btn btn-header"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-header"
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
                                        className="btn btn-header"
                                    >
                                        Login
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={goTo("/register")}
                                        className="btn btn-header"
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
