import React from 'react';
import Auth from '../modules/Auth';
import Users from '../components/Users';

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    Auth
      .fetch('/api/users', {})
      .then(users => {
        this.setState({users});
      });
  }

  render() {
    return <Users users={this.state.users} />;
  }
}
