import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { Task } from "../Task/Task";
import { CalendarComponent } from "./CalendarComponent";
import { IOwnState, IConnectedStore } from "./calendarInterfaces";

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>) => ({});

class CalendarContainer extends React.PureComponent<IConnectedStore, IOwnState> {

  constructor(props: IConnectedStore) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
    this.onClickDay = this.onClickDay.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public render() {
    return (
      <CalendarComponent
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
  }

  private openModal = function() {
    this.setState({modalIsOpened: true});
  }

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  }
}

export const Calendar: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
