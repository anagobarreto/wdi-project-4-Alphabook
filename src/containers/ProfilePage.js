import React from 'react';
import Profile from '../components/Profile';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      statuses: [],
    };
  }

  componentDidMount() {

  }

  render() {
    if (this.state.user) {
      return <Profile user={this.state.user} statuses={this.state.statuses} />;
    } else {
      return null;
    }
  }
}
