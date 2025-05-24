import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Header({ title }) {
    return (
        <div>
            <h1>{title}</h1>
            <UserContext.Consumer>
                {(context) =>
                    context.user ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )
                }
            </UserContext.Consumer>
        </div>
    );
}

export default Header;
