import Layout from './Layout.js';
import Status from './Status.js';
import React from 'react';
import Auth from '../modules/Auth';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showProfilePicDialog: false, follows: props.follows};
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
    return <Layout render={(currentUser) => {
      const isSelf = this.props.user.id === currentUser.id;

      return <div>
        {this.state.showProfilePicDialog &&
          <div>
            <div className="modal">
              <h1>Upload profile pic</h1>
              <form action="/upload-profile-pic" encType="multipart/form-data" method="POST">
                <input type="hidden" name="token" value={Auth.getToken()} />
                <p><input type="file" name="photo" /></p>
                <p><input type="submit" value="Upload" /></p>
              </form>
            </div>
            <div className="modal-background" onClick={() => {
              this.setState({showProfilePicDialog: false});
            }}></div>
          </div>}

        <h1>{this.props.user.name}</h1>

        {isSelf &&
          <button onClick={() => {
            this.setState({showProfilePicDialog: true});
          }}>Change Profile Pic</button>}

        {!isSelf &&
          <button
            onClick={() => {
              this.setFollows(!this.state.follows);
            }}
          >{this.state.follows ? 'Unfollow' : 'Follow'}</button>}

        {this.props.statuses.map(status => {
          return <Status
            key={status._id}
            currentUser={currentUser}
            {...status}
            user={this.props.user}
          />;
        })}
      </div>;
    }} />;
  }
}
