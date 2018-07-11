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
  date: Date;
}

interface IConnectedDispatch {
  addTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  editTask: (task: ITask) => void;
}

const mapStateToProps = (store: IStoreAll): {} => ({});

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

class ModalAddOrEditTaskComponent extends React.Component<IConnectedDispatch & IOwnProps, IOwnState> {

  private task: ITask;
  private taskInput: HTMLInputElement;
  private taskHoursInput: HTMLInputElement;
  private taskMinutesInput: HTMLInputElement;

  constructor(props: & IConnectedDispatch & IOwnProps) {
    super(props);

    this.state = {
      emptyInput: false,
      dateInputError: false,
      date: props.task ? props.task.date : props.date ? props.date : new Date(),
    };
  }

  public componentWillReceiveProps(nextProps: IOwnProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
    }
  }

  public render() {
    console.log('state', this.state)
    console.log('props', this.props)
    return (
        <ReactModal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="modal"
          overlayClassName="overlay"
        >
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

  private showInputIsEmpty = () => {
    if (this.state.emptyInput) {
      return (
        <div>Enter your task!</div>
      );
    }
  }

  private showDateError = () => {
    if (this.state.dateInputError) {
      return (
        <div>Date input error!</div>
      );
    }
  }

  private onAddOrEditTask = () => {
      let dateInputError = false;
      let emptyInput = false;
      this.setState({dateInputError: false});
      this.setState({emptyInput: false});
      if (+this.taskHoursInput.value > 59
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
      if (dateInputError === false && emptyInput === false) {
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

  private onDeleteTask = () => {
    this.props.onRequestClose();
    this.props.deleteTask(this.props.task.id);
  }

  private showTime = () => {
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
        />
        :
        <input
          className="show__time__input"
          ref={(input) => {this.taskMinutesInput = input; }}
          defaultValue={minutes}
          placeholder={minutes}
        />
      </div>
    );
  }

  private showForm = () => {
    if (!this.props.task) {
      return (
        <div>
          <input
            className="text__input"
            type="text"
            ref={(input) => {this.taskInput = input; }}
            placeholder="Enter your task here..."
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
          />
          {this.showTime()}
        </div>
      );
    }
  }

  private onClickDay = (date: Date) => {
    this.setState({date});
  }

  private showButtons = () => {
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
