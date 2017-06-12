
import React from 'react';
import Auth from '../modules/Auth';

export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {follows: props.follows};
  }

  setFollows(follows) {
    this.setState({follows});

    if (follows) {
      Auth.fetch('/api/follow', {
        method: 'POST',
        body: {
          user: this.props.user.id,
        }
      });
    } else {
      Auth.fetch('/api/unfollow', {
        method: 'POST',
        body: {
          user: this.props.user.id,
        }
      });
    }
  }

  render() {
    return <button
      className={this.props.className}
      onClick={() => {
        this.setFollows(!this.state.follows);
      }}
    >{this.state.follows ? 'Unfollow' : 'Follow'}</button>;
  }
}
