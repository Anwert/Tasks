import * as React from "react";
import { IComponentProps } from "./SignUpInterfaces";
import { Link } from "react-router-dom";
import { Redirect} from "react-router-dom";

let email: HTMLInputElement;
let password: HTMLInputElement;
let passwordConfirmation: HTMLInputElement;

export const SignUpComponent = (props: IComponentProps) => {
  const handleSignUp = () => {
    props.handleSignUp(email.value, password.value, passwordConfirmation.value)
  }

  const renderAlert = () => {
    if (props.error) {
      return (
        <div className="alert alert-danger">
          Error!
        </div>
      )
    } else if(props.auth.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops: </strong>{props.auth.error}
        </div>
      )
    }
  }

  const isRegistrated = () => {
    if (props.auth.registrated) {
      return (
        <Redirect from="/signup" to="/signin" />
      )
    }
  }

  return (
    <div>
      {isRegistrated()}
      {renderAlert()}
      <input type="text" placeholder="Email" ref={(input) => {email = input; }}/>
      <input type="text" placeholder="Password" ref={(input) => {password = input; }}/>
      <input type="text" placeholder="Password confirmation" ref={(input) => {passwordConfirmation = input; }}/>
      <Link to="/signin">Sign in</Link>
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
};
