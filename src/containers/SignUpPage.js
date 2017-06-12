import React from 'react';
import SignUpForm from '../components/SignUpForm';
import PropTypes from 'prop-types';

class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
     // @param {object} event - the JavaScript event object

    processForm(event) {
      event.preventDefault();

      fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.user.name,
          email: this.state.user.email,
          password: this.state.user.password,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({
              errors: {}
            });

            localStorage.setItem('successMessage', data.message);

            this.props.router.push('/login');
          } else {
            const errors = data.errors ? data.errors : {};

            this.setState({
              errors
            });
          }
        });
  }
  //Change the user object.

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

   //Render the component.
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpPage;
