import { IAction, ITask } from "../interfaces";

const findBy_id = (state: ITask[], _id: string) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i]._id === _id) {
      return i;
    }
  }
  return -1;
};

export default function tasks(state: ITask[] = [], action: IAction): ITask[] {
  switch (action.type) {
    case "FETCH_TASKS_COMPLETED":
      action.tasks.map((task) => {
        task.date = new Date(task.date);
      });
      return action.tasks;
    case "ADD_TASK_COMPLETED":
      return [...state,
        {
          _id: action.task._id,
          value: action.task.value,
          date: new Date(action.task.date),
          completed: action.task.completed,
        },
      ];
    case "DELETE_TASK_COMPLETED":
      const indexForDelete = findBy_id(state, action._id);
      return [
        ...state.slice(0, indexForDelete),
        ...state.slice(indexForDelete + 1),
      ];
    case "CHANGE_COMPLETE_TASK_COMPLETED":
      const indexForChangeComplete = findBy_id(state, action._id);
      return [
        ...state.slice(0, indexForChangeComplete),
        {
          _id: state[indexForChangeComplete]._id,
          value: state[indexForChangeComplete].value,
          date: state[indexForChangeComplete].date,
          completed: !state[indexForChangeComplete].completed,
        },
        ...state.slice(indexForChangeComplete + 1),
      ];
    case "EDIT_TASK_COMPLETED":
      const indexForEdit = findBy_id(state, action.task._id);
      return [
        ...state.slice(0, indexForEdit),
        {
          _id: action.task._id,
          value: action.task.value,
          date: action.task.date,
          completed: false,
        },
        ...state.slice(indexForEdit + 1),
      ];
    }
  return state;
}
