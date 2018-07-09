import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";
import * as action from "../../actions";
import { IStoreAll, ITask } from "../../reducers";
import { Find } from "../Find/Find";
import { MenuButton } from "../Menu/MenuButton";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";
import { Task } from "../Task/Task";

interface IOwnState {
  date: Date;
  modalIsOpened: boolean;
}

interface IConnectedStore {
  tasks: ITask[];
}

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>) => ({});

class AppComponent extends React.Component<IConnectedStore, IOwnState> {

  constructor(props: IConnectedStore) {
    super(props);
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    };
  }

  public render() {
    return (
      <div className="App">
        <MenuButton />
        <Find />
        <Calendar
          onClickDay={this.onClickDay}
          locale="en"
          value={this.state.date}
        />
        <ul className="tasks">
          {this.showTasks()}
        </ul>
        <button onClick={this.openModal} className="add__button add__button__calendar">+</button>
        <ModalAddOrEditTask isOpen={this.state.modalIsOpened} onRequestClose={this.closeModal}/>
      </div>
    );
  }

  private onClickDay = (date: Date) => {
    this.setState({date});
  }

  private openModal = () => {
    this.setState({modalIsOpened: true});
  }

  private closeModal = () => {
    this.setState({modalIsOpened: false});
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
}

export const App: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(AppComponent);
