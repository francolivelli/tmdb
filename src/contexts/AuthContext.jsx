import { createContext, useState } from "react";

const initialState = {
  user: null, // información del usuario
  isAuthenticated: false, // si está o no logueado
  toggleAuth: () => null, // función para actualizar el contexto
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: localStorage.getItem("user") === null,
    isAuthenticated: localStorage.getItem("user") === null ? false : true,
  });

  const toggleAuth = (user) => {
    setIsLoggedIn({
      user: user,
      isAuthenticated: !isLoggedIn.isAuthenticated,
    });
    localStorage.setItem("user", user)
  };
  
  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
