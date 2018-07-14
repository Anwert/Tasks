import * as React from "react";
import { MenuButton } from "../Menu/MenuButton";
import { Find } from "../Find/FindContainer";
import Calendar from "react-calendar/dist/entry.nostyle";
import { Modal } from "../Modal/ModalContainer";
import { Task } from "../Task/TaskContainer";
import { ITask } from "../../interfaces";
import { IComponentProps } from "./CalendarInterfaces";

export const CalendarComponent = (props: IComponentProps) => (
  <div className="App">
    <MenuButton />
    <Find />
    <Calendar
      onClickDay={props.onClickDay}
      locale="en"
      value={props.date}
    />
    <ul className="tasks">
      {props.tasks.map((task: ITask) => {
        if (task.date.getFullYear() === props.date.getFullYear()
        && task.date.getUTCMonth() === props.date.getUTCMonth()
        && task.date.getDate() === props.date.getDate()) {
          return (
            <li key={task.id}>
              <Task id={task.id}/>
            </li>
          );
        }
      })}
    </ul>
    <button onClick={props.openModal} className="add__button add__button__calendar">+</button>
    <Modal
      isOpen={props.modalIsOpened}
      onRequestClose={props.closeModal}
      date={props.date}
    />
  </div>
);
