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
    const apiUrl = 'http://localhost:5202/api/Users/ValidateUser'; 
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
        body: JSON.stringify(requestData), // Send data in the body as JSON
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setResponse(data);  // Update state with the response data
      } else {
        setResponse('Error: ' + response.statusText); // Handle errors
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
    catch (err)
    {
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
