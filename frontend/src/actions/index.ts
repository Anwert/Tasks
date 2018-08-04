import axios from "axios";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAction, ITask, IUser, IAuth } from "../interfaces";
//import { browserHistory } from 'react-router';

export const addTaskCompleted = (task: ITask): IAction => ({
  type: "ADD_TASK_COMPLETED",
  task,
});

export const addTask: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = (token: string, task: ITask) => {
  return (dispatch: Dispatch<IAction>) => {
    axios.post("http://localhost:3200/tasks/add", {
      value: task.value,
      date: task.date,
    }, {headers: {token}},)
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

//authentication
export const signinUser: ActionCreator<ThunkAction<void, undefined, undefined, IAction>> = (user: IUser) => {
  return function (dispatch: Dispatch<IAction>) {
    // submit email and password to server
    const request = axios.post(`http://localhost:3200/signin`, user)
    request
      .then(response => {
        // -if request is good, we need to update state to indicate user is authenticated and save the token
        dispatch({type: "AUTH_USER", token: response.data.token})
      })
      .catch(() => {
        // If request is bad...
        // -Show an error to the user
        dispatch(authError('bad login info'))
      })
  }
}

export function signoutUser(): IAction {
  return {
    type: "UNAUTH_USER"
  }
}

export const signupUser: ActionCreator<ThunkAction<void, undefined, undefined, IAction>> = (user: IUser) => {
  return function (dispatch: Dispatch<IAction>) {
    axios.post(`http://localhost:3200/signup`, user)
      .then(response => {
        dispatch({type: "SIGNUP_COMPLETED"})
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error))
      })
  }
}

export const authError = (error: string): IAction => {
  return {
    type: "AUTH_ERROR",
    payload: error,
  }
}
