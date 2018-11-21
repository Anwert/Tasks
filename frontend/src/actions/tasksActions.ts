import axios from "axios";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { IAction, ITask } from "../interfaces";

export const addTaskCompleted = (task: ITask): IAction => ({
  type: "ADD_TASK_COMPLETED",
  task,
});

export const addTask: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string, task: ITask) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.post("http://localhost:3200/tasks/add", {
      value: task.value,
      date: task.date,
    }, {headers: {token}})
    .then((response) => {
      dispatch(addTaskCompleted(response.data));
    })
    .catch((error) => {
      throw(error);
    });
  };
};

export const deleteTaskCompleted = (_id: string): IAction => ({
  type: "DELETE_TASK_COMPLETED",
  _id,
});

export const deleteTask: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string, _id: string) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.delete("http://localhost:3200/tasks/delete", {headers: {token}, data: { _id }})
    .then((response) => {
      dispatch(deleteTaskCompleted(_id));
    })
    .catch((error) => {
      throw(error);
    });
  };
};

export const findTask = (value: string): IAction => ({
  type: "FIND_TASK",
  value,
});

export const changeCompleteTaskCompleted = (_id: string): IAction => ({
  type: "CHANGE_COMPLETE_TASK_COMPLETED",
  _id,
});

export const changeCompleteTask: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string, _id: string) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.put("http://localhost:3200/tasks/changecomplete", { _id }, { headers: {token}})
    .then((response) => {
      dispatch(changeCompleteTaskCompleted(_id));
    })
    .catch((error) => {
      throw(error);
    });
  };
};

export const filterTasksByMonth = (month: number): IAction => ({
  type: "FILTER_TASKS_BY_MONTH",
  month,
});

export const editTaskCompleted = (task: ITask): IAction => ({
  type: "EDIT_TASK_COMPLETED",
  task,
});

export const editTask: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string, task: ITask) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.put("http://localhost:3200/tasks/edit", task, {headers: {token}})
    .then((response) => {
      dispatch(editTaskCompleted(task));
    })
    .catch((error) => {
      throw(error);
    });
  };
};

export const fetchTasksCompleted = (tasks: ITask[]): IAction => ({
  type: "FETCH_TASKS_COMPLETED",
  tasks,
});

export const fetchTasks: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.get("http://localhost:3200/tasks/get", {headers: {token}})
    .then((response) => {
      dispatch(fetchTasksCompleted(response.data));
    })
    .catch((error) => {
      throw(error);
    });
  };
};
