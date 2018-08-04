import { ITask } from "../../interfaces";

export interface IComponentProps {
  date: Date;
  modalIsOpened: boolean;
  tasks: ITask[];
  onClickDay: (date: Date) => void;
  openModal: () => void;
  closeModal: () => void;
  token: string;
}

export interface IOwnState {
  date: Date;
  modalIsOpened: boolean;
}

export interface IConnectedStore {
  tasks: ITask[];
  token: string;
}

export interface IConnectedDispatch {
  fetchTasks: (token: string) => void;
}
