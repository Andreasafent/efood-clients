import { Link, NavLink } from "react-router";

function Header(){
    return (
        <div className="navbar bg-base-100 px-10 py-6">
            <div className="flex-1">
                <Link
                    to="/"
                >
                    Efood 360
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink
                            to="/login"
                            className={({isActive})=>
                                isActive ? "bg-gray-500" : ""
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className={({isActive})=>
                                isActive ? "bg-gray-500" : ""
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                    {/* <li>
                        <details>
                        <summary>Parent</summary>
                        <ul className="bg-base-100 rounded-t-none p-2">
                            <li><a>Link 1</a></li>
                            <li><a>Link 2</a></li>
                        </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Header;