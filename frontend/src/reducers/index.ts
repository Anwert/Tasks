import { combineReducers } from 'redux'

import { Action } from '../actions'

export namespace Store {

  export type Task = {
    id?:number,
    date: Date,
    value: string,
    completed: boolean,
  }

  export type Tasks = Task[]

  export type FilterTasks = string

  export type FilterTasksByMonth = number

  export type All = {
    tasks: Tasks
    filterTasks: FilterTasks
    filterTasksByMonth: FilterTasksByMonth
  }
}

const initialState: Store.Tasks = [{
  id: 0,
  value: "Task from Store",
  date: new Date(2018, 5, 23),
  completed: false,
}, {
  id: 1,
  value: "Second task",
  date: new Date(2018, 5, 23),
  completed: false,
}, {
  id: 2,
  value: "Third Task",
  date: new Date(2018, 5, 23),
  completed: false
}]

function tasks (state: Store.Tasks = initialState, action: Action): Store.Tasks {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state,
        {
          id: state[state.length-1].id+1,
          value: action.task.value,
          date: action.task.date,
          completed: false,
        }
      ]
    case 'DELETE_TASK':
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ]
    case 'COMPLETE_TASK':
      return [
        ...state.slice(0, action.id),
        {
          id: state[action.id].id,
          value: state[action.id].value,
          date: state[action.id].date,
          completed: true,
        },
        ...state.slice(action.id + 1),
      ]
    case 'EDIT_TASK':
      console.log('editing task', action.task)
      return [
        ...state.slice(0, action.task.id),
        {
          id: action.task.id,
          value: action.task.value,
          date: action.task.date,
          completed: false,
        },
        ...state.slice(action.task.id + 1),
      ]
  }

  return state
}

function filterTasks (state: Store.FilterTasks = '', action: Action): Store.FilterTasks {
  if (action.type === 'FIND_TASK')
    return action.value
  return state
}

function filterTasksByMonth (state: Store.FilterTasksByMonth = new Date().getUTCMonth(), action: Action): Store.FilterTasksByMonth {
  if (action.type === 'FILTER_TASKS_BY_MONTH')
    return action.month
  return state
}

export const reducers = combineReducers<Store.All>({
  tasks,
  filterTasks,
  filterTasksByMonth,
})
