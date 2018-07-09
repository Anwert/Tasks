import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";
import * as action from "../../actions";
import { IStoreAll, ITask } from "../../reducers";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";

export interface IOwnProps {
  id: string;
}

interface IConnectedStore {
  task: ITask;
}

interface IConnectedDispatch {
  completeTask: (id: string) => void;
}

interface IOwnState {
  completed: boolean;
  modalIsOpened: boolean;
}

const mapStateToProps = (store: IStoreAll, ownProps: IOwnProps): IConnectedStore => ({
  task: store.tasks.find((task) => task.id === ownProps.id),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): IConnectedDispatch => ({
  completeTask: (id: string) => {
    dispatch(action.completeTask(id));
  },
});

class TaskComponent extends React.Component<IConnectedStore & IConnectedDispatch & IOwnProps, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch & IOwnProps) {
    super(props);
    this.state = {
      completed: this.props.task.completed,
      modalIsOpened: false,
    };
  }

  public render() { return this.showTask(); }

  private openModal = () => {
    this.setState({
      modalIsOpened: true,
    });
  }

  private closeModal = () => {
     this.setState({modalIsOpened: false});
   }

  private onCompleteTask = () => {
    this.setState({
      completed: true,
    });
    this.props.completeTask(this.props.id);
  }

  private showTask = () => {
    let minutes = this.props.task.date.getMinutes().toString();
    if (this.props.task.date.getMinutes() < 10) {
      minutes = `0${minutes}`;
    }
    if (!this.state.completed) {
      return (
        <div>
          <div className="task task__incomplete" onClick={this.openModal}>
            <button onClick={this.onCompleteTask} className="btn btn__complete"/>
            <span className="task__value">
              {this.props.task.value}
              <div className="task__time">
                {this.props.task.date.toDateString()} {this.props.task.date.getHours()}:{minutes}
              </div>
            </span>
          </div>
          <ModalAddOrEditTask
            task={this.props.task}
            isOpen={this.state.modalIsOpened}
            onRequestClose={this.closeModal}
          />
        </div>
      );
    } else {
      return (
        <div className="task">
          <button className="btn btn__completed" disabled={true}>
            <i className="fa fa-check" aria-hidden="true" />
          </button>
          <div className="task__value task__completed">
            <div>{this.props.task.value}</div>
            <div className="task__time task__time__completed">
              {this.props.task.date.toDateString()} {this.props.task.date.getHours()}:{minutes}
            </div>
          </div>
        </div>
      );
    }
  }
}

export const Task: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
