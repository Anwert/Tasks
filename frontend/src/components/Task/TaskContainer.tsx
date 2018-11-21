import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as action from "../../actions";
import { IStoreAll, ITask } from "../../interfaces";
import { TaskComponent } from "./TaskComponent";
import { IConnectedDispatch, IConnectedStore, IOwnProps, IOwnState } from "./TaskInterfaces";

const mapStateToProps = (store: IStoreAll, ownProps: IOwnProps): IConnectedStore => ({
  task: store.tasks.find((task) => task._id === ownProps._id),
  token: store.auth.token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ITask[], undefined, redux.AnyAction>): IConnectedDispatch => ({
  changeCompleteTask: (token: string, _id: string) => dispatch(action.changeCompleteTask(token, _id)),
});

class TaskContainer extends React.PureComponent<IConnectedStore & IConnectedDispatch & IOwnProps, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch & IOwnProps) {
    super(props);
    this.state = {
      completed: this.props.task.completed,
      modalIsOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeCompleteTask = this.onChangeCompleteTask.bind(this);
  }

  public render() {
    return (
      <TaskComponent
        task={this.props.task}
        completed={this.state.completed}
        modalIsOpened={this.state.modalIsOpened}
        openModal={this.openModal}
        closeModal={this.closeModal}
        onChangeCompleteTask={this.onChangeCompleteTask}
      />
    );
  }

  private openModal = function() {
    this.setState({
      modalIsOpened: true,
    });
  };

  private closeModal = function() {
     this.setState({modalIsOpened: false});
   };

  private onChangeCompleteTask = function() {
    this.setState({
      completed: !this.state.completed,
      modalIsOpened: false,
    });
    this.props.changeCompleteTask(this.props.token, this.props._id);
  };
}

export const Task: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
