import * as React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { Task } from "../Task/TaskContainer";
import { IComponentProps } from "./CalendarInterfaces";
import { Redirect } from "react-router-dom";

export const CalendarComponent = (props: IComponentProps) => {

  const renderTasks = props.tasks.map((task: ITask) => {
    if (task.date.getFullYear() === props.date.getFullYear()
    && task.date.getUTCMonth() === props.date.getUTCMonth()
    && task.date.getDate() === props.date.getDate()) {
      return (
        <li key={task._id}>
          <Task _id={task._id}/>
        </li>
      );
    }
  });

  const isAuthorized = () => {
    if (!props.token) return (
      <Redirect from="/calendar" to="/signin" />
    )
  }

  return (
    <div className="App">
      {isAuthorized()}
      <MenuButton />
      <Find />
      <Calendar
        onClickDay={props.onClickDay}
        locale="en"
        value={props.date}
      />
      <ul className="tasks">
        {renderTasks}
      </ul>
      <button onClick={props.openModal} className="add__button add__button__calendar">+</button>
      <Modal
        isOpen={props.modalIsOpened}
        onRequestClose={props.closeModal}
        date={props.date}
      />
    </div>
  );
};
