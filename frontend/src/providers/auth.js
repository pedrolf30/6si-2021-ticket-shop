import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    return (
        <AuthContext.Provider value={{user, setUser, isLogged, setIsLogged}}>
            {props.children}
        </AuthContext.Provider>
    );
};