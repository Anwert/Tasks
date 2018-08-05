import * as React from "react";
import { Redirect } from "react-router-dom";

import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { Task } from "../Task/TaskContainer";
import { IComponentProps } from "./ListInterfaces";

export const ListComponent = (props: IComponentProps) => {

  const renderTasks = props.tasks.map((task) => {
    return (
      <li key={task._id}>
        <Task _id={task._id}/>
      </li>
    );
  });

  const isAuthorized = () => {
    if (!props.token) { return (
      <Redirect from="/list" to="/signin" />
    );
    }
  };

  return (
    <div>
      {isAuthorized()}
      <MenuButton />
      <Find />
      <ul className="tasks">
        {renderTasks}
      </ul>
      <button onClick={props.openModal} className="add__button add__button__list">+</button>
      <Modal isOpen={props.modalIsOpened} onRequestClose={props.closeModal}/>
    </div>
  );
};
