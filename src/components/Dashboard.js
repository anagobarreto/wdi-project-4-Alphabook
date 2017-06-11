import { Link } from 'react-router';
import Status from './Status';
import Auth from '../modules/Auth';
import React, { Component } from 'react';
import '../styles/dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {draftStatus: ''};
  }

  postStatus(statusText) {
    const body = new FormData();
    body.append('statusText', statusText);

    Auth.fetch('/api/post-status', {
      method: "POST",
      body,
    }).then(status => {
      //
    });
  }

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
            <div>
              <textarea value={this.state. draftStatus} onChange={(e) => {
                this.setState({draftStatus: e.target.value});
              }} />
              <button onClick={() => {
                const status = this.state.draftStatus;
                this.postStatus(status);
                this.setState({draftStatus: ''});
              }}>Post</button>
            </div>
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
