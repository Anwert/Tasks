import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as ReactDOM from "react-dom";

import * as action from "../../actions";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { ModalComponent } from "./ModalComponent";
import { IConnectedDispatch, IConnectedStore, IOwnProps, IOwnState } from "./ModalInterfaces";

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks,
  token: store.auth.token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ITask[], undefined, redux.AnyAction>): IConnectedDispatch => ({
  addTask: (token: string, task: ITask) => {
    dispatch(action.addTask(token, task));
  },
  deleteTask: (token: string, _id: string) => {
    dispatch(action.deleteTask(token, _id));
  },
  editTask: (token: string, task: ITask) => {
    dispatch(action.editTask(token, task));
  },
});

class ModalContainer extends React.PureComponent<IConnectedStore & IConnectedDispatch & IOwnProps, IOwnState> {

  public component: React.RefObject<HTMLDivElement>;

  constructor(props: IConnectedStore & IConnectedDispatch & IOwnProps) {
    super(props);

    this.component = React.createRef();

    this.state = {
      emptyTask: false,
      dateError: false,
      taskExists: false,
      date: props.task ? props.task.date : props.date ? props.date : new Date(),
      hoursInput: props.task ? props.task.date.getHours().toString() : '',
      minutesInput: props.task ? props.task.date.getMinutes().toString() : '',
      taskInput: props.task ? props.task.value : '',
    };
    this.checkTasks = this.checkTasks.bind(this);
    this.onAddOrEditTask = this.onAddOrEditTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onClickDay = this.onClickDay.bind(this);
    this.handleChangeHours = this.handleChangeHours.bind(this);
    this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
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
        onRequestClose={this.onRequestClose}
        isOpen={this.props.isOpen}
        handleChangeHours={this.handleChangeHours}
        handleChangeMinutes={this.handleChangeMinutes}
        handleChangeTask={this.handleChangeTask}
        clearErrors={this.clearErrors}
      />
    );
  }

  private checkTasks = function() {
    const taskInput = this.state.taskInput;
    const minutesInput = this.state.minutesInput;
    const hoursInput = this.state.hoursInput;

    for (const task of this.props.tasks) {
      if (taskInput.toString() === task.value
      && this.state.date.getFullYear() === task.date.getFullYear()
      && this.state.date.getMonth() === task.date.getMonth()
      && this.state.date.getDate() === task.date.getDate()
      && +hoursInput === task.date.getHours()
      && +minutesInput === task.date.getMinutes()) {
        return true;
      }
    }
    return false;
  };

  private onAddOrEditTask = function() {
      const taskInput = this.state.taskInput;
      const minutesInput = this.state.minutesInput;
      const hoursInput = this.state.hoursInput;

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

      if (this.checkTasks()) {
        this.setState({taskExists: true});
        taskExists = true;
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
          this.task = {_id: this.props.task._id, ...this.task};
          this.props.editTask(this.props.token, this.task);
        } else {
          this.props.addTask(this.props.token, this.task);
        }
      }
    };

  private onDeleteTask = function() {
    this.props.onRequestClose();
    this.props.deleteTask(this.props.token, this.props.task._id);
  };

  private onClickDay = function(date: Date) {
    let newDate = this.state.date;
    newDate.setDate(date.getDate());
    this.setState({date: newDate});
    this.clearErrors();
  };

  private handleChangeHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      hoursInput: event.target.value,
    });
  }

  private handleChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      minutesInput: event.target.value,
    });
  }

  private handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskInput: event.target.value,
    });
  }

  private clearErrors = () => {
    this.setState({
      emptyTask: false,
      dateError: false,
      taskExists: false,
    })
  }

  private onRequestClose = () => {
    this.setState({
      emptyTask: false,
      dateError: false,
      taskExists: false,
    })
    this.props.onRequestClose()
  }
}

export const Modal: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
