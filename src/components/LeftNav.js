// src/components/LeftNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftNav.css'; // Import CSS for the navigation menu

const LeftNav = () => {
  return (
    <div className="left-nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" activeClassName="active">
            Patients
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftNav;