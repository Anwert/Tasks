import { ITask } from "../reducers";

export type Action =
   { type: "ADD_TASK", task: ITask }
|  { type: "FIND_TASK", value: string }
|  { type: "COMPLETE_TASK", id: string }
|  { type: "UNDO_COMPLETE_TASK", id: string }
|  { type: "FILTER_TASKS_BY_MONTH", month: number }
|  { type: "DELETE_TASK", id: string }
|  { type: "EDIT_TASK", task: ITask };

export const addTask = (task: ITask): Action => ({
  type: "ADD_TASK",
  task,
});

export const deleteTask = (id: string): Action => ({
  type: "DELETE_TASK",
  id,
});

export const findTask = (value: string): Action => ({
  type: "FIND_TASK",
  value,
});

export const completeTask = (id: string): Action => ({
  type: "COMPLETE_TASK",
  id,
});

export const undoCompleteTask = (id: string): Action => ({
  type: "UNDO_COMPLETE_TASK",
  id,
});

export const filterTasksByMonth = (month: number): Action => ({
  type: "FILTER_TASKS_BY_MONTH",
  month,
});

export const editTask = (task: ITask): Action => ({
  type: "EDIT_TASK",
  task,
});
