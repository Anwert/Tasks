import * as React from "react";
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

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>) => ({});

class ListComponent extends React.PureComponent<IConnectedStore, IOwnState> {

  constructor(props: IConnectedStore) {
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
      <div>
        <MenuButton />
        <Find />
        <ul className="tasks">
          {this.showTasks()}
        </ul>
        <button onClick={this.openModal} className="add__button add__button__list">+</button>
        <ModalAddOrEditTask isOpen={this.state.modalIsOpened} onRequestClose={this.closeModal}/>
    </div>
  );
}

  private showTasks = () => {
    return this.props.tasks.map((item) => (
        <li key={item.id}>
          <Task id={item.id}/>
        </li>
      ));
  }

  private openModal = function() {
    this.setState({modalIsOpened: true});
  }

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  }
}

export const List: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(ListComponent);
