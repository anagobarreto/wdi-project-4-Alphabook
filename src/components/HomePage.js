import React from 'react';
import { Link } from 'react-router';

const HomePage = () => (
  <div className="homepage">
    <img src="/logo3.png" />
    <p className="intro">Welcome to <strong>alphabook</strong></p>
    <p>If you already have an account then log in</p>
    <p><Link to="/login">Log in</Link></p>
    <p>Or sign up for an account below</p>
    <p><Link to="/signup">Sign up</Link></p>
  </div>
);

export default HomePage;
