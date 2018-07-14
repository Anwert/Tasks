import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { HomeComponent } from "./HomeComponent";
import { IOwnState, IConnectedState } from "./HomeInterfaces"

const mapStateToProps = (store: IStoreAll): IConnectedState => ({
  tasks: store.tasks.filter((task) => {
    const date = new Date();
    if (task.date.getFullYear() === date.getFullYear()
    && task.date.getUTCMonth() === date.getUTCMonth()
    && task.date.getDate() === date.getDate()) {
      return true;
    }
    return false;
  }),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>) => ({});

class HomeContainer extends React.PureComponent<IConnectedState, IOwnState> {

  constructor(props: IConnectedState) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public render() {
    return (
      <HomeComponent
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
  }

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  }
}

export const Home: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
