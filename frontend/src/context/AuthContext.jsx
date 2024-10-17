// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize token and userData from cookies
    const [token, setToken] = useState(Cookies.get('token') || null); // Retrieve token from cookies
    const [userData, setUserData] = useState(Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null); // Retrieve and parse userData from cookies
    const [auth, setAuth] = useState(false);

    // Fetch a new access token using the refresh token (if available)
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {}, { withCredentials: true });
            const newToken = response.data.token;
            
            // Set token and user data both in state and cookies
            setToken(newToken);
            Cookies.set('token', newToken, { expires: 7 }); // Set token in cookies with 15-minute expiration
            
            const newUserData = response.data.user;
            setUserData(newUserData);
            Cookies.set('userData', JSON.stringify(newUserData), { expires: 7}); // Store userData with 15-minute expiration
            setAuth(true);
        } catch (err) {
            // If the token refresh fails, log the user out
            logout();

            // More detailed error handling
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with an error:', err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received:', err.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up request:', err.message);
            }
        }
    };

    // On component mount, attempt to get a new access token
    useEffect(() => {
        refreshAccessToken();
    }, []);

    // Remove token and userData from cookies on logout
    const logout = () => {
        setToken(null);
        setUserData(null);
        Cookies.remove('token'); // Remove token from cookies
        Cookies.remove('userData'); // Remove userData from cookies
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, refreshAccessToken, userData, setUserData, logout, setAuth, auth}}>
            {children}
        </AuthContext.Provider>
    );
};
