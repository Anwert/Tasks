import * as React from "react";
import { MenuButton } from "../Menu/MenuButton";
import { Find } from "../Find/Find";
import Calendar from "react-calendar/dist/entry.nostyle";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";
import { Task } from "../Task/Task";
import { ITask } from "../../interfaces";

export interface IOwnProps {
  date: Date;
  modalIsOpened: boolean;
  tasks: ITask[];
  onClickDay: (date: Date) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const CalendarComponent = (props: IOwnProps) => (
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
    <ModalAddOrEditTask
      isOpen={props.modalIsOpened}
      onRequestClose={props.closeModal}
      date={props.date}
    />
  </div>
);
