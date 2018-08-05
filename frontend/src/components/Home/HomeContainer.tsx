import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../actions";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { HomeComponent } from "./HomeComponent";
import { IConnectedDispatch, IConnectedState, IOwnState } from "./HomeInterfaces";

const mapStateToProps = (store: IStoreAll): IConnectedState => ({
  tasks: store.tasks.filter((task) => {
    const date = new Date();
    if (task.date.getFullYear() === date.getFullYear() &&
      task.date.getUTCMonth() === date.getUTCMonth() &&
      task.date.getDate() === date.getDate()) {
        return true;
      }
    return false;
  }),
  token: store.auth.token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ITask[], undefined, redux.AnyAction>): IConnectedDispatch => ({
  fetchTasks: (token: string) => dispatch(action.fetchTasks(token)),
});

class HomeContainer extends React.PureComponent<IConnectedDispatch & IConnectedState, IOwnState> {

  constructor(props: IConnectedState & IConnectedDispatch) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentWillMount() {
    if (this.props.token) { this.props.fetchTasks(this.props.token); }
  }

  public render() {
    return (
      <HomeComponent
        token={this.props.token}
        date={this.state.date}
        modalIsOpened={this.state.modalIsOpened}
        tasks={this.props.tasks}
        openModal={this.openModal}
        closeModal={this.closeModal}
      />
    );
  }

  private openModal = function() {
    this.setState({modalIsOpened: true});
  };

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  };
}

export const Home: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
