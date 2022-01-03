import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element | JSX.Element[];
}

export const PrivateRoute = ({ children }: any) => {

    const {authState}  = useContext(AuthContext);
    let navigate = useNavigate();
    console.log("PRIVATE ROUTE");
    console.log(authState.auth);
    console.log("-----");
    // if (!authState.auth) navigate("/login");
    // else return (authState.auth ? children : "");

    if (authState.auth) return ( children );
    return (
        <Navigate to="/login" />
    )
}