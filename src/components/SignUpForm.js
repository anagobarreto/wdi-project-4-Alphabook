import React from 'react';
import { Link } from 'react-router';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="homepage login">
    <div className="container">
      <img src="/logo3.png" />

      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">Sign Up</h2>

        <ul>
          {Object.keys(errors).map(key => {
            const val = errors[key];
            if (!val) {
              return null;
            }

            return <li key={key} className="error-message">{val}</li>;
          })}
        </ul>

        <div className="field-line">
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={onChange}
            value={user.name}
          />
        </div>
        <div className="field-line">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div className="field-line">
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
          />
        </div>

        <div className="button-line">
          <input type="submit" value="Create New Account" />
        </div>

        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
      </form>
    </div>
  </div>
);

export default SignUpForm;
