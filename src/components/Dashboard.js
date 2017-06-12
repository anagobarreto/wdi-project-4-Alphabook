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
          <Link to="/profile"> Test Name </Link>
          <ul className="top">
            <li><img className="aside-icons" src="newsfeed.png" /><Link to="/">News Feed</Link></li>
            <li><img className="aside-icons" src="chat (2).png" /><Link to="/messages">Messages</Link></li>
            <li><img className="aside-icons" src="friends.png" /><Link to="/friends">Friends</Link></li>
          </ul>
          <ul className="bottom">
            <li><img className="aside-icons" src="calendar.png" /><Link to="/events">Events</Link></li>
            <li><img className="aside-icons" src="groups.png" /><Link to="/groups">Groups</Link></li>
            <li><img className="aside-icons" src="flag1.png" /><Link to="/pages">Pages</Link></li>
          </ul>
        </aside>

        <section>
          <div className='new-status'>
            <textarea
              placeholder='What&#39;s in your mind?'
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
