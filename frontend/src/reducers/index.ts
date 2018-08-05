import { combineReducers } from "redux";
import { IAction, IAuth, IStoreAll, ITask } from "../interfaces";

import auth from "./auth";

import tasks from "./tasks";

import filterTasks from "./filterTasks";

import filterTasksByMonth from "./filterTasksByMonth";

export const reducers = combineReducers<IStoreAll>({
  auth,
  filterTasks,
  filterTasksByMonth,
  tasks,
});
