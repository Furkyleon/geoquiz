import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Header({ title }) {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Just clear the token & user on the client
        clearUser();
        navigate("/");
    };

    const goTo = (path) => () => navigate(path);

    return (
        <div className="p-4 bg-white shadow">
            <h1 className="text-2xl font-bold">{title}</h1>
            <ul className="flex gap-4 mt-4">
                <li>
                    <button
                        onClick={goTo("/")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Home
                    </button>
                </li>
                {user ? (
                    <>
                        <li>
                            <button
                                onClick={goTo("/profile")}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Login
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={goTo("/register")}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Register
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Header;
