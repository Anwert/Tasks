import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import * as action from "../../../actions";
import { IStoreAll, IUser } from "../../../interfaces";
import { SignUpComponent } from "./SignUpComponent";
import { IConnectedDispatch, IConnectedStore, IOwnState } from "./SignUpInterfaces";
import { ThunkDispatch } from "redux-thunk";

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
      error: false,
      redirectToSignIn: false,
    }
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  public componentWillMount() {
    this.props.signoutUser();
  }

  public render() {
    return (
      <SignUpComponent
        handleSignUp={this.handleSignUp}
        auth={this.props.auth}
        error={this.state.error}
      />
    );
  }

  private handleSignUp = (email: string, password: string, passwordConfirmation: string) => {
    if (password === passwordConfirmation ) {
      this.setState({
        error: false,
      })
      this.props.signupUser({email, password});
    } else {
      this.setState({
        error: true,
      });
    }
  }
}

export const SignUp =
  connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
