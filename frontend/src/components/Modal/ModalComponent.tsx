import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import * as ReactModal from "react-modal";

import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { IComponentProps } from "./ModalInterfaces";

ReactModal.setAppElement("#index");

export const ModalComponent = (props: IComponentProps, ref: React.RefObject<HTMLDivElement>) => {

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.clearErrors();
    event.target.select();
  };

  const renderAlert = () => {
    if (props.emptyTask && props.dateError) return "Error: Task is empty and date is incorrect!";
    if (props.emptyTask) return "Error: Error: Task is empty!";
    if (props.dateError) return "Error: Date is incorrect!";
    if (props.taskExists) return "Error: This task already exists";
  }

  const renderForm = () => {
    if (props.task) {
      const date = props.task.date;
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();

      return (
        <div>
          <input
            placeholder="Enter your task here..."
            className="text__input"
            type="text"
            onChange={props.handleChangeTask}
            defaultValue={props.task.value}
            onFocus={handleFocus}
          />
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
          <div className="render__buttons__edit">
            <button onClick={props.onAddOrEditTask} className="btn">Edit</button>
            <button onClick={props.onDeleteTask} className="btn">Delete</button>
            <button onClick={props.onRequestClose} className="btn">Close</button>
          </div>
        </div>
      );
    } else {
      const date = props.date;
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();

      return (
        <div>
          <input
            className="text__input"
            type="text"
            onChange={props.handleChangeTask}
            placeholder="Enter your task here..."
            onFocus={handleFocus}
          />
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
          <div className="render__buttons__add">
            <button onClick={props.onAddOrEditTask} className="btn">Add</button>
            <button onClick={props.onRequestClose} className="btn">Close</button>
          </div>
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
      <div className="alert">
        {renderAlert()}
      </div>
      <Calendar
        onClickDay={props.onClickDay}
        locale="en"
        value={props.date}
      />
      {renderForm()}
    </ReactModal>
  );
};
