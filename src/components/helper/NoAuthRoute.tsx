import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function NoAuthRoute({children}) {
    const {token, user} = useAuth();

    if(user){
        return <Navigate to={"/stores"}/>
    };

    return children;
}

export default NoAuthRoute;