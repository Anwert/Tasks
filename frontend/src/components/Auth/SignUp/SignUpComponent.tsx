import * as React from "react";
import { Link, Redirect } from "react-router-dom";

import { IComponentProps } from "./SignUpInterfaces";

export const SignUpComponent = (props: IComponentProps) => {

  const isRegistrated = () => {
    if (props.auth.registrated) {
      return (
        <Redirect from="/signup" to="/signin" />
      )
    }
  }

  const renderAlert = () => {

    if (props.emailError && props.passwordEmpty)
      return "Email is incorrect and password can't be empty!";

    if (props.emailError && props.passwordsError)
      return "Email is incorrect and passwords don't match!";

    if (props.emailError) return "Email is incorrect!";

    if (props.passwordEmpty) return "Password can't be empty!"

    if (props.passwordsError) return "Passwords don't match!";

    if (props.auth.error) return props.auth.error;
  }

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.hideErrors();
    event.target.select();
  };

  return (
    <form onSubmit={props.handleSignUp}>
      {isRegistrated()}
      <div className="alert">
        {renderAlert()}
      </div>
      <div>
        <i className="fa fa-user-alt" aria-hidden="true"/>
        <input
          type="text"
          placeholder="Email"
          onChange={props.handleChangeEmail}
          onFocus={handleFocus}
        />
      </div>
      <div>
        <i className="fa fa-unlock" aria-hidden="true"/>
        <input
          type="password"
          placeholder="Password"
          onChange={props.handleChangePassword}
          onFocus={handleFocus}
        />
      </div>
      <div>
        <i className="fa fa-unlock-alt" aria-hidden="true"/>
        <input
          type="password"
          placeholder="Password confirmation"
          onChange={props.handleChangePasswordConfirmation}
          onFocus={handleFocus}
        />
      </div>
      <button type="submit" className="button button__main">
        Sign up
      </button>
      <Link to="/signin" className="button button__alt">Sign in</Link>
    </form>
  );
};
