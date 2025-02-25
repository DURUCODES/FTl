import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserData = localStorage.getItem("user");
    if (token && savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        setIsAuthenticated(true);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        logout,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
