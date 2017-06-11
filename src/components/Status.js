import React from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {liked: this.hasLiked(props.likes)};
  }

  hasLiked(likes) {
    return false;
  }

  setLiked(liked) {
    this.setState({
      liked,
    });

    if (liked) {
      Auth
        .fetch('/api/like', {
          method: 'POST',
          form: {
            status: this.props._id,
          },
        });
    }
  }

  render() {
    const {props} = this;
    return (
      <article className="status">
        <div className="status-container">
          <p className="status-header">
            <img className="profile-pic" src={props.profilePic} />
            <Link to={`/profile/${props.user._id}`}>{props.user.name}</Link>
          </p>
          <p className="status-text">
            {props.text}
          </p>
          {props.likes.length > 0 ? <p className="status-likes">
            {props.likes.length} likes
          </p> : null}
        </div>
        <ul className="status-buttons">
          <li onClick={() => {
            this.setLiked(!this.state.liked);
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
