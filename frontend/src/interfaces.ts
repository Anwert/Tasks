export type IAction =
   { type: "ADD_TASK_COMPLETED", task: ITask }
|  { type: "FIND_TASK", value: string }
|  { type: "CHANGE_COMPLETE_TASK_COMPLETED", _id: string }
|  { type: "FILTER_TASKS_BY_MONTH", month: number }
|  { type: "DELETE_TASK_COMPLETED", _id: string }
|  { type: "EDIT_TASK_COMPLETED", task: ITask }
|  { type: "FETCH_TASKS_COMPLETED", tasks: ITask[] }
|  { type: "AUTH_USER", token: string }
|  { type: "UNAUTH_USER" }
|  { type: "AUTH_ERROR", payload: string }
|  { type: "SIGNUP_COMPLETED" };

export interface ITask {
  _id?: string;
  value: string;
  date: Date;
  completed: boolean;
}

export interface IAuth {
  error: string;
  token: string;
  registrated: boolean;
}

export interface IStoreAll {
  auth: IAuth;
  tasks: ITask[];
  filterTasks: string;
  filterTasksByMonth: number;
}

export interface IUser {
  email: string;
  password: string;
}
