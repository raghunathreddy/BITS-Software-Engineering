// Example Login Component (Login.js)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { AuthProvider } from './AuthContext'; 
import { useAuth } from './AuthContext';


function Login() {
  const [email, setEmail] = useState('');
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login ,user} = useAuth(); // Access the login function from context
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
       if (user) {
       // const data = user;
        setResponse(user);
        navigate(`/dashboard?user_id=${user.user_id}`);
      } else {
        setError( 'Invalid email or password');// Handle errors
      }

      // localStorage.setItem('token', response.data.token);
    }
    catch (err) {
      console.error('Login failed', err);
    }
  };
  return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label>Username:</label>
            <input
             type="email"
            className="form-control"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label>Password:</label> */}
            <label>Password:</label>
            <input 
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
      </div>
    
    // <form onSubmit={handleSubmit}>
    //   <div className="form-group">
    //     <label htmlFor="username">Username:</label>
    //     <input type="text" className="form-control" id="username" />
    //   </div>         <div className="form-group">
    //     <label htmlFor="password">Password:</label>
    //     <input type="password" className="form-control" id="password" />
    //   </div>
    //   <button type="submit" className="btn btn-primary mt-3">Login</button>

     
    // </form>
  );
}

export default Login;
