import { ITask } from "../../interfaces";

export interface IComponentProps {
  task: ITask;
  completed: boolean;
  modalIsOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
  onChangeCompleteTask: () => void;
}

export interface IOwnProps {
  _id: string;
}

export interface IConnectedStore {
  task: ITask;
  token: string;
}

export interface IConnectedDispatch {
  changeCompleteTask: (token: string, _id: string) => void;
}

export interface IOwnState {
  completed: boolean;
  modalIsOpened: boolean;
}
