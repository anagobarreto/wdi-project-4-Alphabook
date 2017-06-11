import React from 'react';
import Auth from '../modules/Auth';
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
    this.fetch();

    this.timeout = setInterval(() => {
      this.fetch();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  fetch() {
    Auth
      .fetch('/api/profile', {
        method: 'POST',
        form: {
          user: this.props.params.user,
        },
      })
      .then(data => {
        this.setState(data);
      });
  }

  render() {
    if (this.state.user) {
      return <Profile user={this.state.user} statuses={this.state.statuses} />;
    } else {
      return null;
    }
  }
}
