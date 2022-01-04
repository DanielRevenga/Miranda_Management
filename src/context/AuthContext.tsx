import React, { createContext, useReducer } from "react";
import { AuthState } from "../interfaces/interfaces";
import { AuthReducer } from "./authReducer";

export type AuthContextProps = {
    authState: AuthState;
    authIn?: () => void;
    authOut?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({authState:{auth: false}});

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    const loadLoggedUser = (): AuthState => {
        try {
            console.log("loadLoggedUser:");
            console.log(localStorage.getItem('loggedUser'));
            if (localStorage.getItem('loggedUser') === "true") return {auth: true};
            
            // return localStorage.getItem('loggedUser');
            // if (localStorage.getItem('loggedUser') !== null && localStorage.getItem('loggedUser')) return true;
            // return localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : false;
            // return false;
        } catch (err) {
            console.log(err);
            return {auth: false};
        }
        return {auth: false};
    }

    // const [auth, setAuth] = useState(loadLoggedUser);

    const [authState, dispatch] = useReducer( AuthReducer, loadLoggedUser());

    const authIn = () => dispatch({type: "login", payload: true});
    const authOut = () => dispatch({type: "logout", payload: false});
    
    return (
        <AuthContext.Provider value={{
            authState,
            authIn,
            authOut
        }}>
            { children }
        </AuthContext.Provider>
    );
}