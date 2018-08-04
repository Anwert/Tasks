import * as React from "react";
import { IComponentProps } from "./SignInInterfaces";
import { Link } from "react-router-dom";
import { Redirect} from "react-router-dom";

let email: HTMLInputElement;
let password: HTMLInputElement;

export const SignInComponent = (props: IComponentProps) => {
  const handleSignIn = () => {
    props.handleSignIn(email.value, password.value)
  }

  const renderAlert = () => {
    if(props.auth.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops: </strong>{props.auth.error}
        </div>
      )
    }
  }

  const redirectToHome = () => {
    if (props.auth.token) {
      return (
        <Redirect from="/signin" to="/home"/>
      )
    }
  }

  return (
    <div>
      {redirectToHome()}
      {renderAlert()}
      <div>
        <i className="fa fa-user-alt" aria-hidden="true"/>
        <input type="text" placeholder="Email" ref={(input) => {email = input; }} />
      </div>
      <div>
        <i className="fa fa-key" aria-hidden="true"/>
        <input type="text" placeholder="Password" ref={(input) => {password = input; }}/>
      </div>
      <button onClick={handleSignIn} className="button button__main">Sign in</button>
      <Link to="/signup" className="button button__alt">Sign up</Link>
    </div>
  );
};
