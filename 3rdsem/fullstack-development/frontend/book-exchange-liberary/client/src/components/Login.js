// Example Login Component (Login.js)
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" className="form-control" id="username" />
      </div>         <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Login</button>

      {/* <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button> */}
    </form>
  );
}

export default Login;
