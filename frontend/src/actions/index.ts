import axios from 'axios';
import { IAction, ITask } from "../interfaces";
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

export const addTask = (task: ITask): IAction => ({
  type: "ADD_TASK",
  task,
});

export const deleteTask = (_id: string): IAction => ({
  type: "DELETE_TASK",
  _id,
});

export const findTask = (value: string): IAction => ({
  type: "FIND_TASK",
  value,
});

export const completeTask = (_id: string): IAction => ({
  type: "COMPLETE_TASK",
  _id,
});

export const undoCompleteTask = (_id: string): IAction => ({
  type: "UNDO_COMPLETE_TASK",
  _id,
});

export const filterTasksByMonth = (month: number): IAction => ({
  type: "FILTER_TASKS_BY_MONTH",
  month,
});

export const editTask = (task: ITask): IAction => ({
  type: "EDIT_TASK",
  task,
});

export const fetchTasksCompleted = (tasks: ITask[]): IAction => ({
  type: "FETCH_TASKS_COMPLETED",
  tasks,
});

// interface IThunkAction

// interface ThunkResult<R> = ThunkAction<R, ITask[], undefined, IAction>;

//ThunkAction<void, ITask[], undefined, IAction>

export const fetchTasks: ActionCreator<ThunkAction<void, ITask[], undefined, IAction>> = () => {
  return (dispatch: Dispatch<IAction>) => {
    axios.get('http://localhost:3200/tasks/get')
      .then(response => {
        dispatch(fetchTasksCompleted(response.data))
      })
      .catch(error => {
        throw(error);
      });
  }
};


// const thunkAction: ActionCreator<ThunkAction<IAction, ITask[], void>> = (
//   text: string
// ) => {
//   return (dispatch: Dispatch<IAction>): Action => {
//     return dispatch({
//       type: "SET_TEXT",
//       text
//     });
//   };
// };
