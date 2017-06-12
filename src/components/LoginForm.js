import React from 'react';
import { Link } from 'react-router';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="homepage login">
    <div className="container">
      <img src="/logo3.png" />

      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">Login</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
          <input
            type="email"
            placeholder="Email"
            name="email"
            errorText={errors.email}
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
            errorText={errors.password}
            value={user.password}
          />
        </div>

        <div className="button-line">
          <input type="submit" value="Log in" />
        </div>

        <div>Don't have an account? <Link to={'/signup'}>Create one</Link></div>
      </form>
    </div>
  </div>
);

export default LoginForm;
