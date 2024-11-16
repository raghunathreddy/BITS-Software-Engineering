// src/components/Menu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'; // Import the CSS for styling the menu

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><Link to="/dashboard">My Book store</Link></li>
        <li><Link to="/search">Exchahge Book</Link></li>
        <li><Link to="/userprofile">Profile</Link></li>
        <li><Link to="/passwordreset">Password Reset</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
