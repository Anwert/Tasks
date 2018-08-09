import { ITask } from "../../interfaces";

export interface IComponentProps {
  onAddOrEditTask: () => void;
  onDeleteTask: () => void;
  onClickDay: (date: Date) => void;
  emptyTask: boolean;
  dateError: boolean;
  taskExists: boolean;
  task: ITask;
  date: Date;
  isOpen: boolean;
  onRequestClose: () => void;
  handleChangeHours: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeMinutes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearErrors: () => void;
}

export interface IOwnProps {
  task?: ITask;
  isOpen: boolean;
  onRequestClose: () => void;
  date?: Date;
}

export interface IOwnState {
  emptyTask: boolean;
  dateError: boolean;
  taskExists: boolean;
  date: Date;
  hoursInput: string;
  minutesInput: string;
  taskInput: string;
}

export interface IConnectedStore {
  tasks: ITask[];
  token: string;
}

export interface IConnectedDispatch {
  addTask: (token: string, task: ITask) => void;
  deleteTask: (token: string, id: string) => void;
  editTask: (token: string, task: ITask) => void;
}
