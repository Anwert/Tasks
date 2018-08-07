import * as React from "react";
import { Link, Redirect } from "react-router-dom";

import { IComponentProps } from "./SignInInterfaces";

export const SignInComponent = (props: IComponentProps) => {

  const redirectToHome = () => {
    if (props.auth.token) {
      return (
        <Redirect from="/signin" to="/home"/>
      )
    }
  }

  const renderAlert = () => {
    if(props.auth.error) {
      return (`Error: ${props.auth.error}`);
    }
  }

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.hideErrors();
    event.target.select();
  };

  return (
    <form onSubmit={props.handleSignIn}>
      {redirectToHome()}
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
        <i className="fa fa-key" aria-hidden="true"/>
        <input
          type="password"
          placeholder="Password"
          onChange={props.handleChangePassword}
          onFocus={handleFocus}
        />
      </div>
      <button type="submit" className="button button__main">
        Sign in
      </button>
      <Link to="/signup" className="button button__alt">Sign up</Link>
    </form>
  );
};
