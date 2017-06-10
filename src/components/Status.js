import React from 'react';

export default class Status extends React.Component {
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
            <img className="like-icon" src="like (3).png" />
            {this.state.liked ? 'Unlike' : 'Like'}
          </li>
          <li>Comment</li>
          <li>Share</li>
        </ul>
      </article>
    );
  }
}
