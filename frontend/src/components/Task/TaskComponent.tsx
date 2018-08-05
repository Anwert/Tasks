import * as React from "react";

import { ITask } from "../../interfaces";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { IComponentProps } from "./TaskInterfaces";

export const TaskComponent = (props: IComponentProps) => {

  const renderTask = () => {
    const minutes =
      props.task.date.getMinutes() < 10 ?
      `0${props.task.date.getMinutes().toString()}` :
      props.task.date.getMinutes().toString();
    if (!props.completed) {
      return (
        <div>
          <div className="task task__incomplete" onClick={props.openModal}>
            <button onClick={props.onChangeCompleteTask} className="btn btn__complete"/>
            <span className="task__value">
              {props.task.value}
              <br/>
              <span className="task__time">
                {props.task.date.toDateString()} {props.task.date.getHours()}:{minutes}
              </span>
            </span>
          </div>
          <Modal
            task={props.task}
            isOpen={props.modalIsOpened}
            onRequestClose={props.closeModal}
          />
        </div>
      );
    } else {
      return (
        <div className="task">
          <button className="btn btn__completed" onClick={props.onChangeCompleteTask}>
            <i className="fa fa-check" aria-hidden="true" />
          </button>
          <span className="task__value task__completed">
            {props.task.value}
            <br/>
            <span className="task__time task__time__completed">
              {props.task.date.toDateString()} {props.task.date.getHours()}:{minutes}
            </span>
          </span>
        </div>
      );
    }
  };

  return (
    <div>
      {renderTask()}
    </div>
  );
};
