import { ITask } from "../../interfaces";

export interface IComponentProps {
  tasks: ITask[];
  modalIsOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
  token: string;
}

export interface IOwnState {
  modalIsOpened: boolean;
}

export interface IConnectedStore {
  tasks: ITask[];
  token: string;
}

export interface IConnectedDispatch {
  fetchTasks: () => void;
}
