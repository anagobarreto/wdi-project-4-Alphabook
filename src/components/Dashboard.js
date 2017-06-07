import { Link } from 'react-router';
import React, { Component } from 'react';
import '../styles/dashboard.css';

const statuses = [
  {
    id: 1,
    name: "Ana Barreto",
    profilePic: "/profilepic.jpg",
    text: "This is a status",
    likeCount: 5,
    liked: false,
  },
  {
    id: 2,
    name: "Ana McKenzie",
    profilePic: "/profilepic.jpg",
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
          <li onClick={() => {
            this.setState({
              liked: !this.state.liked,
            });
          }}>
            {this.state.liked ? 'Unlike' : 'Like'}
          </li>
          <li>Comment</li>
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
          <h1>Anabook</h1>
          <ul>
            <li>Profile</li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </header>
        <main>
          <aside>
            I am a sidebar
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
