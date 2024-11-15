// Example Login Component (Login.js)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost:5202/api/Users/ValidateUser?emailid=${encodeURIComponent(email)}&pwd=${encodeURIComponent(password)}`;

    // Prepare the data to be sent
    const requestData = {
      emailid: email,
      pwd: password,
    };

    try {

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON body
          'Accept': 'application/json', // Expecting JSON response
        },
        //body: JSON.stringify(requestData), // Send data in the body as JSON
      });
      const data = await response.json();
      setResponse(data);
      if (response.ok) {
        console.log(data)
        const user_id = data.user_id;
        navigate(`/dashboard?user_id=${user_id}`);
      } else {
        setError(data.message || 'Invalid email or password');// Handle errors
      }

      // localStorage.setItem('token', response.data.token);

      //if (username === 'admin' && password === 'password') {
      if (email === 'admin' && password === 'password') {
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }

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
