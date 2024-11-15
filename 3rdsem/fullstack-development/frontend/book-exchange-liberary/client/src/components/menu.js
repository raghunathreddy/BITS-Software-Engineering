// src/components/Menu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css'; // Import the CSS for styling the menu

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
