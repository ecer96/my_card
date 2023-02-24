import React, { useState } from "react";
export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [authData, setAuthData] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const login = (token,userId,userName) => {
        setAuthData({token,userId,userName});
        setIsAuth(true);
    };

    const logout = () => {
        setAuthData(null);
        setIsAuth(false);
    };

    const getAuthData=()=>{
        return localStorage.getItem(authData);
    }

    return (
        <AuthContext.Provider value={{ authData, isAuth, login, logout,getAuthData }}>
            {props.children}
        </AuthContext.Provider>
    );
};
    