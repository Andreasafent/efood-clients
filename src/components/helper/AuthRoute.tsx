import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function AuthRoute({children}) {
    const {token, user} = useAuth();

    if(!user){
        return <Navigate to={"/login"}/>
    };

    return children;
}

export default AuthRoute;