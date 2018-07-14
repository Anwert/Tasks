import * as React from "react";
import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { Task } from "../Task/TaskContainer";
import { IComponentProps } from "./ListInterfaces";

export const ListComponent = (props: IComponentProps) => (
  <div>
    <MenuButton />
    <Find />
    <ul className="tasks">
      {props.tasks.map((task: ITask) =>
        <li key={task.id}>
          <Task id={task.id}/>
        </li>,
      )}
    </ul>
    <button onClick={props.openModal} className="add__button add__button__list">+</button>
    <Modal isOpen={props.modalIsOpened} onRequestClose={props.closeModal}/>
  </div>
);
