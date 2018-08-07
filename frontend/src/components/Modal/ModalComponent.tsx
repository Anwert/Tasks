import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import * as ReactModal from "react-modal";

import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { IComponentProps } from "./ModalInterfaces";

ReactModal.setAppElement("#index");

export const ModalComponent = (props: IComponentProps) => {

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const renderTaskIsEmptyError = (emptyTask: boolean) => {
    if (emptyTask) {
      return (
        <div className="error">Your task is empty!</div>
      );
    }
  };

  const renderDateError = (dateError: boolean) => {
    if (dateError) {
      return (
        <div className="error">Date error!</div>
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
          onChange={props.handleChangeHours}
          defaultValue={date.getHours().toString()}
          placeholder={date.getHours().toString()}
          onFocus={handleFocus}
        />
        :
        <input
          className="render__time__input"
          onChange={props.handleChangeMinutes}
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
          onChange={props.handleChangeTask}
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
          onChange={props.handleChangeTask}
          defaultValue={task.value}
          onFocus={handleFocus}
        />
      );
    }
  };

  const renderButtons = () => {
    if (props.task) {
      return (
        <div className="render__buttons__edit">
          <button onClick={props.onAddOrEditTask} className="btn">Edit</button>
          <button onClick={props.onDeleteTask} className="btn">Delete</button>
          <button onClick={props.onRequestClose} className="btn">Close</button>
        </div>
      );
    } else {
      return  (
        <div className="render__buttons__add">
          <button onClick={props.onAddOrEditTask} className="btn">Add</button>
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
