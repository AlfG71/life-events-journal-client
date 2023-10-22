// src/context/auth.context.jsx

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      get('/auth/verify')
      .then((response) => {
        // If the server verifies that the token is valid
        const user = response.data;
       // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      })
      .catch((error) => {
        // If the server sends an error response (invalid token)
        // Update state variables
        removeToken()
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
    }
  }

  const logOutUser = () => {
    navigate('/')
                 // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  }

  useEffect(() => {

    authenticateUser()

  }, []);

  /*
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };