import { ITask } from "../../interfaces";

export interface IComponentProps {
  date: Date;
  modalIsOpened: boolean;
  tasks: ITask[];
  openModal: () => void;
  closeModal: () => void;
}

export interface IOwnState {
  date: Date;
  modalIsOpened: boolean;
}

export interface IConnectedState {
  tasks: ITask[];
}
