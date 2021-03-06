import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../actions";
import { IStoreAll, ITask } from "../../interfaces";
import { CalendarComponent } from "./CalendarComponent";
import { IConnectedDispatch, IConnectedStore, IOwnState } from "./CalendarInterfaces";

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
  token: store.auth.token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ITask[], undefined, redux.AnyAction>): IConnectedDispatch => ({
  fetchTasks: (token: string) => dispatch(action.fetchTasks(token)),
});

class CalendarContainer extends React.PureComponent<IConnectedDispatch & IConnectedStore, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
    this.onClickDay = this.onClickDay.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentWillMount() {
    if (this.props.token) { this.props.fetchTasks(this.props.token); }
  }

  public render() {
    return (
      <CalendarComponent
        token={this.props.token}
        date={this.state.date}
        modalIsOpened={this.state.modalIsOpened}
        onClickDay={this.onClickDay}
        openModal={this.openModal}
        closeModal={this.closeModal}
        tasks={this.props.tasks}
      />
    );
  }

  private onClickDay = function(date: Date) {
    this.setState({date});
  };

  private openModal = function() {
    this.setState({modalIsOpened: true});
  };

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  };
}

export const Calendar =
  connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
