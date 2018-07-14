import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { IOwnProps, IOwnState, IConnectedStore, IConnectedDispatch } from "./ModalInterfaces"
import { ModalComponent } from "./ModalComponent"

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>): IConnectedDispatch => ({
  addTask: (task: ITask) => {
    dispatch(action.addTask(task));
  },
  deleteTask: (id: string) => {
    dispatch(action.deleteTask(id));
  },
  editTask: (task: ITask) => {
    dispatch(action.editTask(task));
  },
});

class ModalContainer extends React.PureComponent<IConnectedStore & IConnectedDispatch & IOwnProps, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch & IOwnProps) {
    super(props);

    this.state = {
      emptyTask: false,
      dateError: false,
      taskExists: false,
      date: props.task ? props.task.date : props.date ? props.date : new Date(),
    };
    this.checkTasks = this.checkTasks.bind(this);
    this.onAddOrEditTask = this.onAddOrEditTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onClickDay = this.onClickDay.bind(this);
  }

  public componentWillReceiveProps(nextProps: IOwnProps) {
    if (this.props.date && nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
    }
  }

  public render() {
    return (
      <ModalComponent
        onAddOrEditTask={this.onAddOrEditTask}
        onDeleteTask={this.onDeleteTask}
        onClickDay={this.onClickDay}
        emptyTask={this.state.emptyTask}
        dateError={this.state.dateError}
        taskExists={this.state.taskExists}
        task={this.props.task}
        date={this.state.date}
        onRequestClose={this.props.onRequestClose}
        isOpen={this.props.isOpen}
      />
    );
  }

  private checkTasks = function(hoursInput: string, minutesInput: string, taskInput: string) {
    for (let i = 0; i < this.props.tasks.length; i++) {
      if (taskInput.toString() === this.props.tasks[i].value
      && this.state.date.getFullYear() === this.props.tasks[i].date.getFullYear()
      && this.state.date.getMonth() === this.props.tasks[i].date.getMonth()
      && this.state.date.getDate() === this.props.tasks[i].date.getDate()
      && +hoursInput === this.props.tasks[i].date.getHours()
      && +minutesInput === this.props.tasks[i].date.getMinutes()) {
        return true;
      }
    }
    return false;
  }

  private onAddOrEditTask = function(hoursInput: string, minutesInput: string, taskInput: string) {
      let dateError = false;
      let emptyTask = false;
      let taskExists = false;
      this.setState({dateError: false});
      this.setState({emptyTask: false});
      this.setState({taskExists: false});
      if (+hoursInput > 23
        || +hoursInput < 0
        || +minutesInput > 59
        || +minutesInput < 0
        || isNaN(+hoursInput)
        || isNaN(+minutesInput)
      ) {
        this.setState({dateError: true});
        dateError = true;
      }
      if (taskInput.length < 1) {
        this.setState({emptyTask: true});
        emptyTask = true;
      }
      if (this.checkTasks(hoursInput, minutesInput, taskInput)) {
        this.setState({taskExists: true});
        taskExists= true;
      }
      if (dateError === false && emptyTask === false && taskExists === false) {
        this.task = {
          value: taskInput,
          date: new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth(),
            this.state.date.getDate(),
            +hoursInput,
            +minutesInput,
          ),
          completed: false,
        };
        this.setState({dateError: false});
        this.setState({emptyTask: false});
        this.setState({taskExists: false});
        dateError = false;
        emptyTask = false;
        this.props.onRequestClose();
        if (this.props.task) {
          this.task = {id: this.props.task.id, ...this.task};
          this.props.editTask(this.task);
        } else {
          this.props.addTask(this.task);
        }
      }
    }

  private onDeleteTask = function() {
    this.props.onRequestClose();
    this.props.deleteTask(this.props.task.id);
  }

  private onClickDay = function(date: Date) {
    this.setState({date});
  }
}

export const Modal: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
