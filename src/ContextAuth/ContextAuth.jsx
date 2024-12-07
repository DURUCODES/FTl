import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (userToken, userData) => {
    setToken(userToken);
    setIsAuthenticated(true);
    setUser(userData); // Store user data in context
    localStorage.setItem("authToken", userToken); // Save token in local storage
    localStorage.setItem("userData", JSON.stringify(userData)); // Save user data in local storage
  };

  useEffect(() => {
    // Check if a token and user data are already saved in localStorage

    const savedToken = localStorage.getItem("authToken");
    const savedUserData = localStorage.getItem("userData");
    if (savedToken && savedUserData) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUserData)); // Parse and load user data from localStorage
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null); // Clear user data
    localStorage.removeItem("authToken"); // Clear token from localStorage
    localStorage.removeItem("userData"); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
