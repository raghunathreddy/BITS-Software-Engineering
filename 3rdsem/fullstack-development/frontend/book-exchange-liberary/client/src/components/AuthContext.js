import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the AuthContext to manage authentication globally
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if there's a user in localStorage when the app loads
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set the user data from localStorage
    }
  }, []);

  // Login function to authenticate user and store the user ID in localStorage
  const login = async (email, password) => {
    try {
      const apiUrl = `http://localhost:5202/api/Users/ValidateUser?emailid=${encodeURIComponent(email)}&pwd=${encodeURIComponent(password)}`;

      const response = await fetch(apiUrl, {  // Replace with your API URL
        method: 'POST',
       
        headers: {
          'Content-Type': 'application/json', // JSON body
          'Accept': 'application/json', // Expecting JSON response
        },
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json(); // Assuming API returns user data
      setUser(data); // Set the user data in the state

      // Save user data (or just user ID) in localStorage
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please try again.');
    }
  };

  // Logout function to clear user data from state and localStorage
  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user data from state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
