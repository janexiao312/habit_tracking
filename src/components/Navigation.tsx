import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/daily-tracking">Daily Tracking</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
