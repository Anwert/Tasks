import { IAction, ITask } from "../interfaces";

export const addTask = (task: ITask): IAction => ({
  type: "ADD_TASK",
  task,
});

export const deleteTask = (id: string): IAction => ({
  type: "DELETE_TASK",
  id,
});

export const findTask = (value: string): IAction => ({
  type: "FIND_TASK",
  value,
});

export const completeTask = (id: string): IAction => ({
  type: "COMPLETE_TASK",
  id,
});

export const undoCompleteTask = (id: string): IAction => ({
  type: "UNDO_COMPLETE_TASK",
  id,
});

export const filterTasksByMonth = (month: number): IAction => ({
  type: "FILTER_TASKS_BY_MONTH",
  month,
});

export const editTask = (task: ITask): IAction => ({
  type: "EDIT_TASK",
  task,
});
