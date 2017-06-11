import React from 'react';
import { Link } from 'react-router';

export default function Layout(props) {
  return <div>
    <header>
      <div className="container">
        <h1>
          <Link to="/">
            <img src="/logo3.png" height="35" width="35"/>
          </Link>
        </h1>
        <ul>
          <li><Link to="/profile">Ana</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </header>
    <main>
      <div className="container">
        {props.children}
      </div>
    </main>
    <footer>
      <div className="container">
        Website by Ana Barreto
      </div>
    </footer>
  </div>;
}
