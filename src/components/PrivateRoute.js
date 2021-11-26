import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {

    const auth  = useContext(AuthContext);
    console.log("fdfdfd");
    console.log(auth.logged);
    console.log("-----");
    return auth.logged ? children : <Navigate to="/login" />;
}