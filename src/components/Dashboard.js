import Markdown from 'react-remarkable';
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
      <Layout render={currentUser => {
        return <div>
          <aside className="aside">
            <h1 className="profile-name">
              <Link to={"/profile/" + currentUser.id}>
                <img src={currentUser.profilePic} />
                {currentUser.name}
              </Link>
            </h1>
            <ul className="top">
              <li>
                <Link to="/">
                  <img className="aside-icons" src="newsfeed.png" />
                  News Feed
                </Link>
              </li>
              <li>
                <Link to="/messages">
                  <img className="aside-icons" src="chat (2).png" />
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/friends">
                  <img className="aside-icons" src="friends.png" />
                  Friends
                </Link>
              </li>
            </ul>
            <ul className="bottom">
              <li>
                <Link to="/events">
                  <img className="aside-icons" src="calendar.png" />
                  Events
                </Link>
              </li>
              <li>
                <Link to="/groups">
                  <img className="aside-icons" src="groups.png" />
                  Groups
                </Link>
              </li>
              <li>
                <Link to="/pages">
                  <img className="aside-icons" src="flag1.png" />
                  Pages
                </Link>
              </li>
            </ul>
          </aside>

          <section>
            <div className='new-status'>
              <textarea
                placeholder={`What's on your mind, ${currentUser.name}?`}
                value={this.state.draftStatus}
                ref={(textarea) => {
                  this.textarea = textarea;
                }}
                onChange={(e) => {
                  this.setState({draftStatus: e.target.value});
                }}
              />

              <div className='button-container'>
                <button onClick={() => {
                  const status = this.state.draftStatus.trim();
                  if (!status) {
                    this.textarea.focus();
                    return;
                  }

                  this.postStatus(status);
                  this.setState({draftStatus: ''});
                }}>Post</button>
              </div>
            </div>

            {this.state.draftStatus && <article className='status'>
              <div className='status-container'>
                <p><strong>Preview</strong></p>
                <Markdown source={this.state.draftStatus} />
              </div>
            </article>}

            {statuses.length ? null : <div className="empty-warning">
              <p>You aren't following anyone!</p>
              <p>Check out the <Link to='/users'>Users</Link> page and find people to follow.</p>
            </div>}

            {statuses.map(status => {
              return <Status key={status.id} currentUser={currentUser} {...status} />;
            })}
          </section>
        </div>;
      }} />
    );
  }
}
