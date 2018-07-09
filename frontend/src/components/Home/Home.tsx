import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";
import * as actions from "../../actions";
import { IStoreAll, ITask } from "../../reducers";
import { MenuButton } from "../Menu/MenuButton";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";
import { Task } from "../Task/Task";

interface IOwnState {
  date: Date;
  modalIsOpened: boolean;
}

interface IConnectedState {
  tasks: ITask[];
}

const mapStateToProps = (state: IStoreAll): IConnectedState => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<actions.Action>) => ({});

class HomeComponent extends React.Component<IConnectedState, IOwnState> {

  constructor(props: IConnectedState) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
  }

  public render() {
    return (
      <div>
        <MenuButton />
        <div className="hello">Hello!</div>
        <div className="show__day">{this.showDay()}</div>
        <div className="show__date">{this.showDate()}</div>
        {this.showTasksForTodayLabel()}
        <ul className="tasks">
          {this.showTasks()}
        </ul>
        <button onClick={this.openModal} className="add__button add__button__home">+</button>
        <ModalAddOrEditTask isOpen={this.state.modalIsOpened} onRequestClose={this.closeModal}/>
      </div>
    );
  }

  private showDay = () => {
    switch (this.state.date.getUTCDay()) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friday";
      case 5:
        return "Saturday";
      case 6:
        return "Sunday";
    }
  }

  private showDate = () => {
    switch (this.state.date.getUTCMonth()) {
      case 0:
        return (`January ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 1:
        return (`February ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 2:
        return (`March ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 3:
        return (`April ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 4:
        return (`May ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 5:
        return (`June ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 6:
        return (`July ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 7:
        return (`August ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 8:
        return (`September ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 9:
        return (`October ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 10:
        return (`November ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
      case 11:
        return (`December ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`);
    }
  }

  private showTasksForTodayLabel = () => {
    if (this.props.tasks.filter((task) => task.date.getDate() === this.state.date.getDate()).length > 0) {
      return (<div>Tasks for today:</div>);
    } else {
      return (<div>No tasks for today</div>);
    }
  }

  private showTasks = () => {
    return this.props.tasks.map((item) => {
      if (item.date.getFullYear() === this.state.date.getFullYear()
          && item.date.getUTCMonth() === this.state.date.getUTCMonth()
          && item.date.getDate() === this.state.date.getDate()) {
            return (
              <li key={item.id}>
                <Task id={item.id}/>
              </li>
            );
          }
    });
  }

  private openModal = () => {
    this.setState({modalIsOpened: true});
  }

  private closeModal = () => {
    this.setState({modalIsOpened: false});
  }
}

export const Home: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
