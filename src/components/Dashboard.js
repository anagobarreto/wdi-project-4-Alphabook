import { Link } from 'react-router';
import Status from './Status';
import React, { Component } from 'react';
import '../styles/dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <header>

          <h1><Link to="/">
          <img src="/logo3.png" height="35" width="35"/>
        </Link></h1>
          <ul>
            <li><Link to="/profile">Ana</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </header>
        <main>
          <aside className="aside">
            <ul className="top">
              <li><Link to="/profile">Ana Barreto</Link></li>
              <li><Link to="/">News Feed</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/friends">Friends</Link></li>
            </ul>
            <ul className="bottom">
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/groups">Groups</Link></li>
              <li><Link to="/pages">Pages</Link></li>
            </ul>

          </aside>
          <section>
            {this.props.statuses.map(status => {
              return <Status key={status.id} {...status} />;
            })}
          </section>
        </main>
        <footer>Website by Ana Barreto</footer>
      </div>
    );
  }
}
