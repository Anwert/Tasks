import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../../actions";
import { IStoreAll, IUser } from "../../../interfaces";
import { SignInComponent } from "./SignInComponent";
import { IConnectedDispatch, IConnectedStore } from "./SignInInterfaces";

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

class SignInContainer extends React.PureComponent<IConnectedDispatch & IConnectedStore> {

  constructor(props: IConnectedDispatch & IConnectedStore) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  public componentWillMount() {
    this.props.signoutUser();
  }

  public render() {
    return (
      <SignInComponent
        handleSignIn={this.handleSignIn}
        auth={this.props.auth}
      />
    );
  }

  private handleSignIn = (email: string, password: string) => {
    this.props.signinUser({email, password})
  }
}

export const SignIn =
  connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
