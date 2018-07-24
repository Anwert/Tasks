import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import * as action from "../../actions";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { TaskComponent } from "./TaskComponent";
import { IConnectedDispatch, IConnectedStore, IOwnProps, IOwnState } from "./TaskInterfaces";

const mapStateToProps = (store: IStoreAll, ownProps: IOwnProps): IConnectedStore => ({
  task: store.tasks.find((task) => task._id === ownProps._id),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>): IConnectedDispatch => ({
  completeTask: (_id: string) => {
    dispatch(action.completeTask(_id));
  },
  undoCompleteTask: (_id: string) => {
    dispatch(action.undoCompleteTask(_id));
  },
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
    this.onCompleteTask = this.onCompleteTask.bind(this);
    this.onUndoCompleteTask = this.onUndoCompleteTask.bind(this);
  }

  public render() {
    return (
      <TaskComponent
        task={this.props.task}
        completed={this.state.completed}
        modalIsOpened={this.state.modalIsOpened}
        openModal={this.openModal}
        closeModal={this.closeModal}
        onCompleteTask={this.onCompleteTask}
        onUndoCompleteTask={this.onUndoCompleteTask}
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

  private onCompleteTask = function() {
    this.setState({
      completed: true,
    });
    this.props.completeTask(this.props._id);
  };

  private onUndoCompleteTask = function() {
    this.setState({
      completed: false,
      modalIsOpened: false,
    });
    this.props.undoCompleteTask(this.props._id);
  };
}

export const Task: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
