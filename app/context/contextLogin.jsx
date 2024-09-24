import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Récupérer les favoris et l'utilisateur stockés lors du montage du composant
        const loadFromStorage = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem("favorites");
                const storedUser = await AsyncStorage.getItem("user");

                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log("Error loading data from storage", error);
            }
        };

        loadFromStorage();
    }, []);

    const saveFavoritesToStorage = async (favorites) => {
        try {
            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.log("Error saving favorites to storage", error);
        }
    };

    const saveUserToStorage = async (user) => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log("Error saving user to storage", error);
        }
    };

    const login = (email, password) => {
        if (email === "mickaellunzola@gmail.com" && password === "Mdk") {
            const user = { email, password };
            setUser(user);
            saveUserToStorage(user);
            return true;
        }
        return false;
    };

    const logout = async () => {
        setUser(null);
        try {
            await AsyncStorage.removeItem("user");
        } catch (error) {
            console.log("Error removing user from storage", error);
        }
    };

    const addFavorite = (item) => {
        if (!favorites.includes(item)) {
            const newFavorites = [...favorites, item];
            setFavorites(newFavorites);
            saveFavoritesToStorage(newFavorites);
        }
    };

    const removeFavorite = (item) => {
        const newFavorites = favorites.filter((fav) => fav !== item);
        setFavorites(newFavorites);
        saveFavoritesToStorage(newFavorites);
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

// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [favorites, setFavorites] = useState([]);

//     const login = (email, password) => {
//         if (email === "mickaellunzola@gmail.com" && password === "Mdk") {
//             setUser({ email, password });
//             return true;
//         }
//         return false;
//     };

//     const logout = () => {
//         setUser(null);
//         setFavorites([]);
//     };

//     const addFavorite = (item) => {
//         if (!favorites.includes(item)) {
//             setFavorites([...favorites, item]);
//         }
//     };

//     const removeFavorite = (item) => {
//         setFavorites(favorites.filter((fav) => fav !== item));
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 login,
//                 logout,
//                 favorites,
//                 addFavorite,
//                 removeFavorite,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useState, useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         // Récupérer les favoris et l'utilisateur stockés lors du montage du composant
//         const loadFavoritesFromStorage = async () => {
//             try {
//                 const storedFavorites = await AsyncStorage.getItem("favorites");
//                 if (storedFavorites) {
//                     setFavorites(JSON.parse(storedFavorites));
//                 }

//                 const storedUser = await AsyncStorage.getItem("user");
//                 if (storedUser) {
//                     setUser(JSON.parse(storedUser));
//                 }
//             } catch (error) {
//                 console.log(
//                     "Error loading favorites or user from storage",
//                     error
//                 );
//             }
//         };

//         loadFavoritesFromStorage();
//     }, []);

//     const saveFavoritesToStorage = async (favorites) => {
//         try {
//             await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
//         } catch (error) {
//             console.log("Error saving favorites to storage", error);
//         }
//     };

//     const saveUserToStorage = async (user) => {
//         try {
//             await AsyncStorage.setItem("user", JSON.stringify(user));
//         } catch (error) {
//             console.log("Error saving user to storage", error);
//         }
//     };

//     const login = (email, password) => {
//         if (email === "mickaellunzola@gmail.com" && password === "Mdk") {
//             const user = { email, password };
//             setUser(user);
//             saveUserToStorage(user);
//             return true;
//         }
//         return false;
//     };

//     // const logout = async () => {
//     //     setUser(null);
//     //     setFavorites([]);
//     //     try {
//     //         await AsyncStorage.removeItem("user");
//     //         await AsyncStorage.removeItem("favorites");
//     //     } catch (error) {
//     //         console.log("Error removing user or favorites from storage", error);
//     //     }
//     // };
//     const logout = async () => {
//         setUser(null);
//         try {
//             await AsyncStorage.removeItem("user"); // On supprime uniquement l'utilisateur
//         } catch (error) {
//             console.log("Error removing user from storage", error);
//         }
//     };

//     const addFavorite = (item) => {
//         if (!favorites.includes(item)) {
//             const newFavorites = [...favorites, item];
//             setFavorites(newFavorites);
//             saveFavoritesToStorage(newFavorites);
//         }
//     };

//     const removeFavorite = (item) => {
//         const newFavorites = favorites.filter((fav) => fav !== item);
//         setFavorites(newFavorites);
//         saveFavoritesToStorage(newFavorites);
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 login,
//                 logout,
//                 favorites,
//                 addFavorite,
//                 removeFavorite,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
