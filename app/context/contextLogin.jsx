import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const login = (email, password) => {
        if (email === "mickaellunzola@gmail.com" && password === "Mdk") {
            setUser({ email, password });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setFavorites([]);
    };

    const addFavorite = (item) => {
        if (!favorites.includes(item)) {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (item) => {
        setFavorites(favorites.filter((fav) => fav !== item));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                favorites,
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
