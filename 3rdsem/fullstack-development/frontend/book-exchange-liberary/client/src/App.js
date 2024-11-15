// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import BookSearch from './components/BookSearch';
// function App() {
// return (
// <Router>
// <Routes>
// <Route path="/login" element={<Login />} />
// <Route path="/booksearch" element={<BookSearch />} />
// {/* Add other routes here */}
// </Routes>
// </Router>


// // <div className="App">
// //   <header className="App-header">
// //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
// //     {/* <p>
// //       Edit <code>src/App.js</code> and save to reload.
// //     </p>
// //     <a
// //       className="App-link"
// //       href="https://reactjs.org"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //     >
// //       Learn React
// //     </a> */}
// //     {/* <Login></Login> */}

// //   </header>
// // </div>
// );
// }

// export default App;


import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import BookSearch from './components/BookSearch';
import Dashboard from './components/Dashboard';
import Addbook from './components/Addbook';
import UserProfile from './components/userprofile';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="bg-primary text-white text-center py-3"><h1>Book Exchange Library </h1>
            {/* <nav>
             <ul className="nav justify-content-center">
              <li className="nav-item"><Link className="nav-link text-white" to="/">Login</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/search">Book Search</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/addbook">Add New Book</Link></li>
            </ul>
          </nav> */}
          </header>
          <main className="container mt-5">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/search" element={<BookSearch />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addbook" element={<Addbook />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
          </main>
          <footer className="bg-primary text-white text-center py-3 mt-auto"><p>&copy; 2024 Book Exchange All rights reserved.</p></footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
