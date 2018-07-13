import { combineReducers } from "redux";
import { IAction, ITask, IStoreAll } from "../interfaces";

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const initialState: ITask[] = [{
  id: ID(),
  value: "First task",
  date: new Date(),
  completed: false,
}, {
  id: ID(),
  value: "Second task",
  date: new Date(),
  completed: false,
}, {
  id: ID(),
  value: "Third Task",
  date: new Date(),
  completed: false,
}];

const findByID = (state: ITask[], id: string) => {
  let index = 0;
  state.map((el) => {
    if (el.id === id) {
      index = state.indexOf(el);
    }
  });
  return index;
};

function tasks(state: ITask[] = initialState, action: IAction): ITask[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state,
        {
          id: ID(),
          value: action.task.value,
          date: action.task.date,
          completed: false,
        },
      ];
    case "DELETE_TASK":
      const indexForDelete = findByID(state, action.id);
      return [
        ...state.slice(0, indexForDelete),
        ...state.slice(indexForDelete + 1),
      ];
    case "COMPLETE_TASK":
      const indexForComplete = findByID(state, action.id);
      return [
        ...state.slice(0, indexForComplete),
        {
          id: state[indexForComplete].id,
          value: state[indexForComplete].value,
          date: state[indexForComplete].date,
          completed: true,
        },
        ...state.slice(indexForComplete + 1),
      ];
    case "UNDO_COMPLETE_TASK":
      const indexForUndoComplete = findByID(state, action.id);
      return [
        ...state.slice(0, indexForUndoComplete),
        {
          id: state[indexForUndoComplete].id,
          value: state[indexForUndoComplete].value,
          date: state[indexForUndoComplete].date,
          completed: false,
        },
        ...state.slice(indexForUndoComplete + 1),
      ];
    case "EDIT_TASK":
      const indexForEdit = findByID(state, action.task.id);
      return [
        ...state.slice(0, indexForEdit),
        {
          id: action.task.id,
          value: action.task.value,
          date: action.task.date,
          completed: false,
        },
        ...state.slice(indexForEdit + 1),
      ];
    }
  return state;
}

function filterTasks(state: string = "", action: IAction): string {
  if (action.type === "FIND_TASK") {
    return action.value;
  }
  return state;
}

function filterTasksByMonth(state: number = new Date().getUTCMonth(), action: IAction): number {
  if (action.type === "FILTER_TASKS_BY_MONTH") {
    return action.month;
  }
  return state;
}

export const reducers = combineReducers<IStoreAll>({
  filterTasks,
  filterTasksByMonth,
  tasks,
});
