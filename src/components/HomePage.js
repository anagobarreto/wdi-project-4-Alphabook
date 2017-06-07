import React from 'react';
import Auth from '../modules/Auth';
import { Link } from 'react-router';

const HomePage = () => (
  <div className="container">
    <div className="top-bar-right">
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  </div>
);

export default HomePage;
