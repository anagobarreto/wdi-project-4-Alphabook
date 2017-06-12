import Markdown from 'react-remarkable';
import React from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.deriveState(props);
  }

  deriveState(props) {
    return {
      liked: this.hasLiked(props.likes),
      editing: false,
      deleted: false,
      text: '',
      comment: '',
      comments: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps._id !== this.props._id) {
      this.setState(this.deriveState(nextProps));
    }

    if (nextProps.comments.length !== this.props.comments.length) {
      this.setState({comments: []});
    }
  }

  hasLiked(likes) {
    for (const user of likes) {
      if (this.props.currentUser.id === user._id) {
        return true;
      }
    }
    return false;
  }

  setLiked(liked) {
    this.setState({
      liked,
    });

    Auth
      .fetch(liked ? '/api/like' : '/api/unlike', {
        method: 'POST',
        body: {
          status: this.props._id,
        },
      });
  }

  delete() {
    Auth
      .fetch('/api/delete-post', {
        method: 'POST',
        body: {
          status: this.props._id,
        },
      });
  }

  save() {
    Auth
      .fetch('/api/save-post', {
        method: 'POST',
        body: {
          status: this.props._id,
          text: this.state.text.trim(),
        },
      });
  }

  _renderLikes() {
    let likes = this.props.likes.slice();
    if (this.state.liked) {
      if (!this.hasLiked(likes)) {
        likes.unshift(this.props.currentUser);
      }
    } else {
      likes = likes.filter(user => {
        return user._id !== this.props.currentUser.id;
      });
    }
    if (likes.length > 0) {
      return <p className="status-likes">
        {likes.map(user => {
          return <Link to={'/profile/' + user._id}>{user.name}</Link>;
        })}
      </p>;
    } else {
      return null;
    }
  }

  isOwner() {
    return this.props.user._id === this.props.currentUser.id;
  }

  _renderComments() {
    let comments = this.props.comments.concat(this.state.comments);

    return <ul className='comments'>
      {comments.map(comment => {
        return <li key={comment._id}>
          <img className="profile-pic" src={comment.user.profilePic} />
          <Link to={'/profile/' + comment.user._id}>{comment.user.name}</Link> {comment.text}
        </li>;
      })}
    </ul>;
  }

  postComment(comment) {
    this.setState({
      comments: this.state.comments.concat({
        user: this.props.currentUser,
        text: comment,
      }),
    });
    Auth
      .fetch('/api/add-comment', {
        method: 'POST',
        body: {
          status: this.props._id,
          comment,
        },
      });
  }

  render() {
    const {props} = this;
    if (this.state.deleted) {
      return null;
    }

    let text = <Markdown source={this.state.text || props.text} />;
    if (this.state.editing) {
      text = <div className='new-status'>
        <textarea
          ref={(ref) => {
            if (!this.state.editFocused) {
              ref.focus();
              this.setState({editFocused: true});
            }
          }}
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
        />

        <div className='button-container'>
          <button
            onClick={() => {
              if (!this.state.text.trim()) {
                return;
              }

              this.setState({
                editing: false,
              });
              this.save();
            }}
          >
            Save
          </button>

          <button
            onClick={() => {
              this.setState({
                editing: false,
                text: this.props.text,
              });
            }}
          >
            Cancel
          </button>
        </div>
      </div>;
    }

    return (
      <article className="status">
        <div className="status-container">
          <p className="status-header">
            <img className="profile-pic" src={props.user.profilePic} />
            <Link to={`/profile/${props.user._id}`}>{props.user.name}</Link>

            {this.isOwner() && <div className='right'>
              <button
                onClick={() => {
                  this.setState({
                    editing: true,
                    text: this.props.text,
                    editFocused: false,
                  });
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  this.delete();
                  this.setState({
                    deleted: true,
                  });
                }}
              >
                Delete
              </button>
            </div>}
          </p>
          <p className="status-text">
            {text}
          </p>
        </div>
        <ul className="status-buttons">
          <li className={this.state.liked ? 'liked' : 'not-liked'} onClick={() => {
            this.setLiked(!this.state.liked);
          }}>
            <span className="like-icon" />
            Like
          </li>
          <li onClick={() => {
            this.commentField.focus();
          }}><img className="comment-icon" src="/comment.png" />Comment</li>
          <li><img className="share-icon" src="/share.png" />Share</li>
        </ul>
        <div className='status-footer'>
          {this._renderLikes()}

          {this._renderComments()}

          <input
            type='text'
            className='comment-input'
            placeholder='Write a comment...'
            value={this.state.comment}
            ref={ref => {
              this.commentField = ref;
            }}
            onChange={e => {
              this.setState({comment: e.target.value});
            }}
            onKeyDown={e => {
              const comment = this.state.comment.trim();
              if (e.key === 'Enter' && comment) {
                this.postComment(comment);
                this.setState({
                  comment: '',
                });
                e.target.blur();
              }
            }}
          />
        </div>
      </article>
    );
  }
}
