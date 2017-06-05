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

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
      } else {
        const errors = xhr.response.errors ? xhr.response.errors: {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
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
