import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../../actions";
import { IConnectedDispatch } from "./LogoutInterfaces";

const mapDispatchToProps = (dispatch: ThunkDispatch<undefined, undefined, redux.AnyAction>): IConnectedDispatch => ({
  signoutUser: () => {
    dispatch(action.signoutUser());
  },
});

class LogoutContainer extends React.PureComponent<IConnectedDispatch> {

  constructor(props: IConnectedDispatch) {
    super(props);
  }

  public componentWillMount() {
    this.props.signoutUser();
  }

  public render() {
    return (
      <Redirect to="/signin" />
    );
  }
}

export const Logout =
  connect(null, mapDispatchToProps)(LogoutContainer);
