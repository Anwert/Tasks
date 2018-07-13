import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import * as redux from "redux";
import * as action from "../../actions";
import { IStoreAll, ITask } from "../../reducers";

interface IOwnProps {
  task?: ITask;
  isOpen: boolean;
  onRequestClose: () => void;
  date?: Date;
}

interface IOwnState {
  emptyInput: boolean;
  dateInputError: boolean;
  taskExistsError: boolean;
  date: Date;
}

interface IConnectedStore {
  tasks: ITask[];
}

interface IConnectedDispatch {
  addTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  editTask: (task: ITask) => void;
}

const mapStateToProps = (store: IStoreAll) => ({
  tasks: store.tasks,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): IConnectedDispatch => ({
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

ReactModal.setAppElement("#index");

class ModalAddOrEditTaskComponent extends React.PureComponent<IConnectedStore & IConnectedDispatch & IOwnProps, IOwnState> {

  private task: ITask;
  private taskInput: HTMLInputElement;
  private taskHoursInput: HTMLInputElement;
  private taskMinutesInput: HTMLInputElement;

  constructor(props: IConnectedStore & IConnectedDispatch & IOwnProps) {
    super(props);

    this.state = {
      emptyInput: false,
      dateInputError: false,
      taskExistsError: false,
      date: props.task ? props.task.date : props.date ? props.date : new Date(),
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.showInputIsEmpty = this.showInputIsEmpty.bind(this);
    this.showDateError = this.showDateError.bind(this);
    this.showTaskExistsError = this.showTaskExistsError.bind(this);
    this.checkTasks = this.checkTasks.bind(this);
    this.onAddOrEditTask = this.onAddOrEditTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.showTime = this.showTime.bind(this);
    this.showForm = this.showForm.bind(this);
    this.onClickDay = this.onClickDay.bind(this);
    this.showButtons = this.showButtons.bind(this);
  }

  public componentWillReceiveProps(nextProps: IOwnProps) {
    if (this.props.date && nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
    }
  }

  public render() {
    return (
        <ReactModal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="modal"
          overlayClassName="overlay"
        >
          {this.showTaskExistsError()}
          {this.showInputIsEmpty()}
          {this.showDateError()}
          <Calendar
            onClickDay={this.onClickDay}
            locale="en"
            value={this.state.date}
          />
          {this.showForm()}
          {this.showButtons()}
        </ReactModal>
    );
  }

  private handleFocus = function(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.select();
  }

  private showInputIsEmpty = function() {
    if (this.state.emptyInput) {
      return (
        <div className='error'>Enter your task!</div>
      );
    }
  }

  private showDateError = function() {
    if (this.state.dateInputError) {
      return (
        <div className='error'>Date input error!</div>
      );
    }
  }

  private showTaskExistsError = function() {
    if (this.state.taskExistsError) {
      return (
        <div className='error'>This task already exists!</div>
      );
    }
  }

  private checkTasks = function() {
    let ret = false;
    this.props.tasks.map((task: ITask) => {
      if (task.value === this.taskInput.value.toString()
      && this.state.date.getFullYear() === task.date.getFullYear()
      && this.state.date.getMonth() === task.date.getMonth()
      && this.state.date.getDate() === task.date.getDate()
      && +this.taskHoursInput.value === task.date.getHours()
      && +this.taskMinutesInput.value === task.date.getMinutes()) {
        ret = true;
      }
    })
    return ret;
  }

  private onAddOrEditTask = function() {
      let dateInputError = false;
      let emptyInput = false;
      let taskExistsError = false;
      this.setState({dateInputError: false});
      this.setState({emptyInput: false});
      this.setState({taskExistsError: false});
      if (+this.taskHoursInput.value > 23
        || +this.taskHoursInput.value < 0
        || +this.taskMinutesInput.value > 59
        || +this.taskMinutesInput.value < 0
        || isNaN(+this.taskHoursInput.value)
        || isNaN(+this.taskMinutesInput.value)
      ) {
        this.setState({dateInputError: true});
        dateInputError = true;
      }
      if (this.taskInput.value.length < 1) {
        this.setState({emptyInput: true});
        emptyInput = true;
      }
      if (this.checkTasks()) {
        this.setState({taskExistsError: true});
        taskExistsError= true;
      }
      if (dateInputError === false && emptyInput === false && taskExistsError === false) {
        this.task = {
          value: this.taskInput.value,
          date: new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth(),
            this.state.date.getDate(),
            +this.taskHoursInput.value,
            +this.taskMinutesInput.value,
          ),
          completed: false,
        };
        this.setState({dateInputError: false});
        this.setState({emptyInput: false});
        this.setState({taskExistsError: false});
        dateInputError = false;
        emptyInput = false;
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

  private showTime = function() {
    let minutes = this.state.date.getMinutes().toString();
    if (this.state.date.getMinutes() < 10) {
      minutes = `0${minutes}`;
    }
    return (
      <div className="show__time">
        <div className="show__time__label">Enter time:</div>
        <input
          className="show__time__input"
          ref={(input) => {this.taskHoursInput = input; }}
          defaultValue={this.state.date.getHours().toString()}
          placeholder={this.state.date.getHours().toString()}
          onFocus={this.handleFocus}
        />
        :
        <input
          className="show__time__input"
          ref={(input) => {this.taskMinutesInput = input; }}
          defaultValue={minutes}
          placeholder={minutes}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }

  private showForm = function() {
    if (!this.props.task) {
      return (
        <div>
          <input
            className="text__input"
            type="text"
            ref={(input) => {this.taskInput = input; }}
            placeholder="Enter your task here..."
            onFocus={this.handleFocus}
          />
          {this.showTime()}
        </div>
      );
    } else {
      return (
        <div>
          <input
            placeholder="Enter your task here..."
            className="text__input"
            type="text"
            ref={(input) => {this.taskInput = input; }}
            defaultValue={this.props.task.value}
            onFocus={this.handleFocus}
          />
          {this.showTime()}
        </div>
      );
    }
  }

  private onClickDay = function(date: Date) {
    this.setState({date});
  }

  private showButtons = function() {
    if (this.props.task) {
      return (
        <div className="show__buttons__edit">
          <button onClick={this.onAddOrEditTask} className="btn">Edit</button>
          <button onClick={this.onDeleteTask} className="btn">Delete</button>
          <button onClick={this.props.onRequestClose} className="btn">Close</button>
        </div>
      );
    } else {
      return  (
        <div className="show__buttons__add">
          <button onClick={this.onAddOrEditTask} className="btn">Add</button>
          <button onClick={this.props.onRequestClose} className="btn">Close</button>
        </div>
      );
    }
  }
}

export const ModalAddOrEditTask: React.ComponentClass<IOwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalAddOrEditTaskComponent);
