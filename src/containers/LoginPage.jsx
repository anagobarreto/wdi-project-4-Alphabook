import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      erros: {},
      user: {
        email: '',
        password: ''
      }
    };

    this processForm = this.processForm.bind(this);
    thins.changeUser = this.changeuser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
  }

  changeUser(event) {
    const filed = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.erros}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
