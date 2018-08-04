import { ITask } from "../../interfaces";

export interface IComponentProps {
  tasks: ITask[];
  enabledMonth: number;
  modalIsOpened: boolean;
  chooseMonth: (month: number) => void;
  enabled: (month: number) => void;
  getDate: () => Date;
  openModal: () => void;
  closeModal: () => void;
  token: string;
}

export interface IOwnState {
  modalIsOpened: boolean;
}

export interface IConnectedStore {
  tasks: ITask[];
  enabledMonth: number;
  token: string;
}

export interface IConnectedDispatch {
  filterTasksByMonth: (month: number) => void;
  fetchTasks: (token: string) => void;
}

export interface IMonthButtonProps {
  chooseMonth: (month: number) => void;
  enabled: (month: number) => void;
  monthName: string;
  monthNumber: number;
}
