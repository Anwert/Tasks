import { ITask } from "../../interfaces";

export interface IComponentProps {
  task: ITask;
  completed: boolean;
  modalIsOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
  onCompleteTask: () => void;
  onUndoCompleteTask: () => void;
}

export interface IOwnProps {
  _id: string;
}

export interface IConnectedStore {
  task: ITask;
}

export interface IConnectedDispatch {
  completeTask: (id: string) => void;
  undoCompleteTask: (id: string) => void;
}

export interface IOwnState {
  completed: boolean;
  modalIsOpened: boolean;
}
