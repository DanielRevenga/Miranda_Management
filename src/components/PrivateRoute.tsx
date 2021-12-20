import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {

    const {auth}  = useContext(AuthContext);
    console.log("PRIVATE ROUTE");
    console.log(auth);
    console.log("-----");
    return (auth ? children : <Navigate to="/login" />);
}