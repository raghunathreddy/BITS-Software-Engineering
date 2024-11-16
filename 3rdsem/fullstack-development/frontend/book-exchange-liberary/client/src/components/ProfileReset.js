import React, { useState } from 'react';
import './ProfileReset.css';
import Menu from './menu';
import { useAuth } from './AuthContext';


const ProfileReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { user, logout } = useAuth();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!email || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Call the API (Replace the URL with your API endpoint)
      const response = await fetch(`http://localhost:5202/api/Users/ResetPassword/${user.user_id}?password=${encodeURIComponent(newPassword)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successful!');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="reset-button" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ProfileReset;
