import { Link } from 'react-router';
import React, { Component } from 'react';
import '../styles/dashboard.css';

const statuses = [
  {
    id: 1,
    name: "Ana Barreto",
    profilePic: "/avatar.jpg",
    text: "This is a status",
    likeCount: 5,
    liked: false,
  },
  {
    id: 2,
    name: "Ana McKenzie",
    profilePic: "/avatar.jpg",
    text: "This is a status tasdfasdf",
    likeCount: 8,
    liked: true,
  },
  {
    id: 3,
    name: "Sebastian McKenzie",
    profilePic: "/avatar.jpg",
    text: "This is a status tasdfasdf",
    likeCount: 8,
    liked: true,
  },
  {
    id: 4,
    name: "Sebastian Barreto",
    profilePic: "/avatar.jpg",
    text: "This is a status tasdfasdf",
    likeCount: 8,
    liked: true,
  }
];

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {liked: props.liked};
  }

  render() {
    const {props} = this;
    return (
      <article className="status">
        <div className="status-container">
          <p className="status-line">
            <img className="profile-pic" src={props.profilePic} />
            <span>{props.name}</span>
          </p>
          <p className="status-text">
            {props.text}
          </p>
          <p className="status-likes">
            {props.likeCount} likes
          </p>
        </div>
        <ul className="status-buttons">
          <img class="like" src="like (3).png" />
          <li onClick={() => {
            this.setState({
              liked: !this.state.liked,
            });
          }}>
            {this.state.liked ? 'Unlike' : 'Like'}
          </li>
          <li>Comment</li>
          <li>Share</li>
        </ul>
      </article>
    );
  }
}

class App extends Component {
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
            {statuses.map(status => {
              return <Status key={status.id} {...status} />;
            })}
          </section>
        </main>
        <footer>Website by Ana Barreto</footer>
      </div>
    );
  }
}

export default App;
