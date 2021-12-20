import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {

    

    const loadLoggedUser = () => {
        try {
            console.log("loadLoggedUser:");
            console.log(localStorage.getItem('loggedUser'));
            return localStorage.getItem('loggedUser');
            if (localStorage.getItem('loggedUser') !== null && localStorage.getItem('loggedUser')) return true;
            // return localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : false;
            return false;
        } catch (err) {
            console.log(err);
        }
    }

      const [auth, setAuth] = useState(loadLoggedUser);
    
    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            { props.children }
        </AuthContext.Provider>
    );
}