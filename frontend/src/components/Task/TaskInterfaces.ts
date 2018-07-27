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
}

export interface IConnectedDispatch {
  changeCompleteTask: (id: string) => void;
}

export interface IOwnState {
  completed: boolean;
  modalIsOpened: boolean;
}
