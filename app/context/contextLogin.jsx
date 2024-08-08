import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const login = () => {
        setUser(true);
    };

    const logout = () => {
        setUser(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Créer un hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};
