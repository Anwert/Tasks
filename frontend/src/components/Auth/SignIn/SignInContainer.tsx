import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../../actions";
import { IStoreAll, IUser } from "../../../interfaces";
import { SignInComponent } from "./SignInComponent";
import { IConnectedDispatch, IConnectedStore, IOwnState } from "./SignInInterfaces";

const mapStateToProps = (store: IStoreAll) => ({
  auth: store.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<undefined, undefined, redux.AnyAction>): IConnectedDispatch => ({
  signinUser: (user: IUser) => {
    dispatch(action.signinUser(user));
  },
  signoutUser: () => {
    dispatch(action.signoutUser())
  }
});

class SignInContainer extends React.PureComponent<IConnectedDispatch & IConnectedStore, IOwnState> {

  constructor(props: IConnectedDispatch & IConnectedStore) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  public componentWillMount() {
    this.props.signoutUser();
  }

  public render() {
    return (
      <SignInComponent
        auth={this.props.auth}
        hideErrors={this.props.signoutUser}
        handleSignIn={this.handleSignIn}
        handleChangeEmail={this.handleChangeEmail}
        handleChangePassword={this.handleChangePassword}
      />
    );
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

  private handleSignIn = (event: React.SyntheticEvent) => {
    const email = this.state.emailInput;
    const password = this.state.passwordInput;

    this.props.signinUser({email, password});

    event.preventDefault();
  }
}

export const SignIn =
  connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
