import React, { useState, useEffect } from 'react';
import './userprofile.css';  // Import the CSS file
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from './menu';
import { useAuth } from './AuthContext';

const UserProfile = () => {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5202/api/Users/GetUser/${user.user_id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
    {/* Sidebar (Menu) */}
    <Menu />
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>User ID:</strong> {users.user_id}</p>
          <p><strong>Name:</strong> {users.username}</p>
          <p><strong>Email:</strong> {users.email}</p>
          <p><strong>Favorite_genres:</strong> {users.favorite_genres}</p>
          <p><strong>Reading Preferences:</strong> {users.reading_preferences}</p>
          {/* Render more user info as needed */}
        </div>
      ) : (
        <div>No user data found</div>
      )}
    </div>
    </div>
  );
};

export default UserProfile;
