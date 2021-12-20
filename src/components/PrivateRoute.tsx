import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: JSX.Element | JSX.Element[];
}

export const PrivateRoute = ({ children }: any) => {

    const {authState}  = useContext(AuthContext);
    console.log("PRIVATE ROUTE");
    console.log(authState);
    console.log("-----");
    return (authState ? children : <Navigate to="/login" />);
}