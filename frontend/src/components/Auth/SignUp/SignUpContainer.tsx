import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as EmailValidator from 'email-validator';

import * as action from "../../../actions";
import { IStoreAll, IUser } from "../../../interfaces";
import { SignUpComponent } from "./SignUpComponent";
import { IConnectedDispatch, IConnectedStore, IOwnState } from "./SignUpInterfaces";

const mapStateToProps = (store: IStoreAll) => ({
  auth: store.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUser, undefined, redux.AnyAction>): IConnectedDispatch => ({
  signupUser: (user: IUser) => {
    dispatch(action.signupUser(user));
  },
  signoutUser: () => {
    dispatch(action.signoutUser())
  }
});

class SignUpContainer extends React.PureComponent<IConnectedDispatch & IConnectedStore, IOwnState> {

  constructor (props: IConnectedDispatch & IConnectedStore) {
    super(props);

    this.state = {
      redirectToSignIn: false,
      emailError: false,
      passwordsError: false,
      passwordEmpty: false,
      emailInput: '',
      passwordInput: '',
      passwordConfirmationInput: '',
    }
    this.hideErrors = this.hideErrors.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this);
  }

  public componentWillMount() {
    this.props.signoutUser();
  }

  public render() {
    return (
      <SignUpComponent
        auth={this.props.auth}
        hideErrors={this.hideErrors}
        emailError={this.state.emailError}
        passwordEmpty={this.state.passwordEmpty}
        passwordsError={this.state.passwordsError}
        handleChangeEmail={this.handleChangeEmail}
        handleChangePassword={this.handleChangePassword}
        handleChangePasswordConfirmation={this.handleChangePasswordConfirmation}
        handleSignUp={this.handleSignUp}
      />
    );
  }

  private hideErrors = () => {
    this.setState({
      emailError: false,
      passwordEmpty: false,
      passwordsError: false,
    });
    this.props.signoutUser();
  }

  private handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailInput: event.target.value,
    });
  }

  private handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordInput: event.target.value,
    });
  }

  private handleChangePasswordConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordConfirmationInput: event.target.value,
    });
  }

  private handleSignUp = (event: React.SyntheticEvent) => {
    const email = this.state.emailInput;
    const password = this.state.passwordInput;
    const passwordConfirmation = this.state.passwordConfirmationInput;

    let emailError = false;
    let passwordEmpty = false;
    let passwordsError = false;

    if (!EmailValidator.validate(email)) {
      emailError = true;
      this.setState({emailError: true});
    }

    if (password === "") {
      passwordEmpty = true;
      this.setState({passwordEmpty: true});
    }

    if (password !== passwordConfirmation) {
      passwordsError = true;
      this.setState({passwordsError: true});
    }

    if (!emailError && !passwordsError) {
      emailError = false;
      passwordsError = false;
      this.setState({
        emailError: false,
        passwordsError: false,
      });

      this.props.signupUser({email, password});
    }

    event.preventDefault();
  }
}

export const SignUp =
  connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
