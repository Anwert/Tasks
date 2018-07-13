export type IAction =
   { type: "ADD_TASK", task: ITask }
|  { type: "FIND_TASK", value: string }
|  { type: "COMPLETE_TASK", id: string }
|  { type: "UNDO_COMPLETE_TASK", id: string }
|  { type: "FILTER_TASKS_BY_MONTH", month: number }
|  { type: "DELETE_TASK", id: string }
|  { type: "EDIT_TASK", task: ITask };

export interface ITask {
  id?: string;
  value: string;
  date: Date;
  completed: boolean;
}

export interface IStoreAll {
  tasks: ITask[];
  filterTasks: string;
  filterTasksByMonth: number;
}
