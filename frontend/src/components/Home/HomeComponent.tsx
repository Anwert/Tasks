import * as React from "react";
import{ IOwnProps } from "./HomeInterfaces";
import { MenuButton } from "../Menu/MenuButton";
import { Task } from "../Task/Task";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";
import { ITask } from "../../interfaces";

const renderDay = (day: number) => {
  switch (day) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
}

const renderDate = (date: Date) => {
  switch (date.getUTCMonth()) {
    case 0:
      return (`January ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 1:
      return (`February ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 2:
      return (`March ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 3:
      return (`April ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 4:
      return (`May ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 5:
      return (`June ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 6:
      return (`July ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 7:
      return (`August ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 8:
      return (`September ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 9:
      return (`October ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 10:
      return (`November ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
    case 11:
      return (`December ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
  }
}

const renderTasksForTodayLabel = (tasks: ITask[]) => {
  if (tasks.length > 0) {
    return ("Tasks for today:");
  } else {
    return ("No tasks for today");
  }
}

export const HomeComponent = (props: IOwnProps) => {
  return (
    <div>
      <MenuButton />
      <div className="hello">Hello!</div>
      <div className="show__day">
        {renderDay(props.date.getUTCDay())}
      </div>
      <div className="show__date">
        {renderDate(props.date)}
      </div>
      <div>
        {renderTasksForTodayLabel(props.tasks)}
      </div>
      <ul className="tasks">
        {props.tasks.map((task) => {
            return (
              <li key={task.id}>
                <Task id={task.id}/>
              </li>
            );
          }
        )}
      </ul>
      <button onClick={props.openModal} className="add__button add__button__home">+</button>
      <ModalAddOrEditTask isOpen={props.modalIsOpened} onRequestClose={props.closeModal}/>
    </div>
  );
};
