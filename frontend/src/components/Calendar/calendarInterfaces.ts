import { ITask } from "../../interfaces"

export interface IOwnState {
  date: Date;
  modalIsOpened: boolean;
}

export interface IConnectedStore {
  tasks: ITask[];
}
