import React from 'react';
import { Link } from 'react-router';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input
          placeholder="Name"
          type="text"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>
      <div className="field-line">
        <input
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
        <input type="submit" label="Create New Account" />
      </div>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </form>
  </div>
);

export default SignUpForm;
