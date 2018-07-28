import { ITask } from "../../interfaces";

export interface IComponentProps {
  tasks: ITask[];
  modalIsOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface IOwnState {
  modalIsOpened: boolean;
}

export interface IConnectedStore {
  tasks: ITask[];
}

export interface IConnectedDispatch {
  fetchTasks: () => void;
}
