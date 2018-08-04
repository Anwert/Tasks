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
    } else if (props.auth.error) {
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
      <div>
        <i className="fa fa-user-alt" aria-hidden="true"/>
        <input type="text" placeholder="Email" ref={(input) => {email = input; }}/>
      </div>
      <div>
        <i className="fa fa-unlock" aria-hidden="true"/>
        <input type="text" placeholder="Password" ref={(input) => {password = input; }}/>
      </div>
      <div>
        <i className="fa fa-unlock-alt" aria-hidden="true"/>
        <input type="text" placeholder="Password confirmation" ref={(input) => {passwordConfirmation = input; }}/>
      </div>
      <button onClick={handleSignUp} className="button button__main">Sign up</button>
      <Link to="/signin" className="button button__alt">Sign in</Link>
    </div>
  );
};
