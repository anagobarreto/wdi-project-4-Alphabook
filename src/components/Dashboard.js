import { Link } from 'react-router';
import Status from './Status';
import Auth from '../modules/Auth';
import React, { Component } from 'react';
import Layout from './Layout.js';
import '../styles/dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {draftStatus: '', extraStatuses: []};
  }

  postStatus(statusText) {
    Auth.fetch('/api/post-status', {
      method: "POST",
      body: {statusText},
    }).then(status => {
      this.setState({extraStatuses: [status].concat(this.state.extraStatuses)});
    });
  }

  componentWillReceiveProps() {
    this.setState({extraStatuses: []});
  }

  render() {
    const statuses = this.state.extraStatuses.concat(this.props.statuses);

    return (
      <Layout>
        <aside className="aside">
          <Link to="/profile">Ana Barreto</Link>
          <ul className="top">
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
          <div className='new-status'>
            <textarea
              placeholder='Post a new status...'
              value={this.state.draftStatus}
              onChange={(e) => {
                this.setState({draftStatus: e.target.value});
              }}
            />

            <div className='button-container'>
              <button onClick={() => {
                const status = this.state.draftStatus;
                this.postStatus(status);
                this.setState({draftStatus: ''});
              }}>Post</button>
            </div>
          </div>
          {statuses.map(status => {
            return <Status key={status.id} {...status} />;
          })}
        </section>
      </Layout>
    );
  }
}
