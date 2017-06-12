import Layout from './Layout.js';
import Status from './Status.js';
import FollowButton from './FollowButton.js';
import React from 'react';
import Auth from '../modules/Auth';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showProfilePicDialog: false};
  }

  render() {
    return <Layout render={(currentUser) => {
      const isSelf = this.props.user.id === currentUser.id;

      return <div className="profile-page">
        <div className="cover">
          <img src={this.props.user.profilePic} className="profile-pic" />
          <h1>{this.props.user.name}</h1>

          {isSelf &&
            <button className="right" onClick={() => {
              this.setState({showProfilePicDialog: true});
            }}>Change Profile Pic</button>}

          {!isSelf &&
            <FollowButton className="right" user={this.props.user} follows={this.props.follows} />}
        </div>

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
