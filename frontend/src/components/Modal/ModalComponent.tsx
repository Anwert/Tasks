import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import * as ReactModal from "react-modal";
import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { IComponentProps } from "./ModalInterfaces";

ReactModal.setAppElement("#index");

let taskInput: HTMLInputElement;
let hoursInput: HTMLInputElement;
let minutesInput: HTMLInputElement;

const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.target.select();
};

const renderTaskIsEmptyError = (emptyTask: boolean) => {
  if (emptyTask) {
    return (
      <div className="error">Enter your task!</div>
    );
  }
};

const renderDateError = (dateError: boolean) => {
  if (dateError) {
    return (
      <div className="error">Date input error!</div>
    );
  }
};

const renderTaskExistsError = (taskExists: boolean) => {
  if (taskExists) {
    return (
      <div className="error">This task already exists!</div>
    );
  }
};

const renderTime = (date: Date) => {
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
  return (
    <div className="render__time">
      <div className="render__time__label">Enter time:</div>
      <input
        className="render__time__input"
        ref={(input) => {hoursInput = input; }}
        defaultValue={date.getHours().toString()}
        placeholder={date.getHours().toString()}
        onFocus={handleFocus}
      />
      :
      <input
        className="render__time__input"
        ref={(input) => {minutesInput = input; }}
        defaultValue={minutes}
        placeholder={minutes}
        onFocus={handleFocus}
      />
    </div>
  );
};

const renderForm = (task: ITask) => {
  if (!task) {
    return (
      <input
        className="text__input"
        type="text"
        ref={(input) => {taskInput = input; }}
        placeholder="Enter your task here..."
        onFocus={handleFocus}
      />
    );
  } else {
    return (
      <input
        placeholder="Enter your task here..."
        className="text__input"
        type="text"
        ref={(input) => {taskInput = input; }}
        defaultValue={task.value}
        onFocus={handleFocus}
      />
    );
  }
};

export const ModalComponent = (props: IComponentProps) => {
  const onAddOrEditTask = () => {
    props.onAddOrEditTask(hoursInput.value, minutesInput.value, taskInput.value);
  };

  const renderButtons = () => {
    if (props.task) {
      return (
        <div className="render__buttons__edit">
          <button onClick={onAddOrEditTask} className="btn">Edit</button>
          <button onClick={props.onDeleteTask} className="btn">Delete</button>
          <button onClick={props.onRequestClose} className="btn">Close</button>
        </div>
      );
    } else {
      return  (
        <div className="render__buttons__add">
          <button onClick={onAddOrEditTask} className="btn">Add</button>
          <button onClick={props.onRequestClose} className="btn">Close</button>
        </div>
      );
    }
  };

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      {renderTaskExistsError(props.taskExists)}
      {renderTaskIsEmptyError(props.emptyTask)}
      {renderDateError(props.dateError)}
      <Calendar
        onClickDay={props.onClickDay}
        locale="en"
        value={props.date}
      />
      {renderForm(props.task)}
      {renderTime(props.date)}
      {renderButtons()}
    </ReactModal>
  );
};
