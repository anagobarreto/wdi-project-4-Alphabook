import Layout from './Layout.js';
import React from 'react';
import Auth from '../modules/Auth';
import { Link } from 'react-router';
import FollowButton from './FollowButton.js';

export default class Users extends React.Component {
  render() {
    return <Layout render={(currentUser) => {
      return <div>
        <h1>Users</h1>
        <ul className='users-list'>
          {this.props.users.map(user => {
            if (user.id === currentUser.id) {
              return null;
            }

            return <li key={user.id}>
              <img src={user.profilePic} />
              <Link to={'/profile/' + user.id}>{user.name}</Link>
              <FollowButton user={user} follows={user.follows} />
            </li>;
          })}
        </ul>
      </div>;
    }} />;
  }
}
