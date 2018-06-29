import { Store } from '../reducers'

type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: Error }

type QEmpty = Q<null>
type QValue = Q<{ value: string }>

export type Action =
// UI actions
   { type: 'ADD_TASK', task: Store.Task }
|  { type: 'FIND_TASK', value: string }
|  { type: 'COMPLETE_TASK', id: number }
|  { type: 'FILTER_TASKS_BY_MONTH', month: number }
|  { type: 'DELETE_TASK', id: number }
|  { type: 'EDIT_TASK', task: Store.Task}

// Async actions...
| ({ type: 'SAVE_TASKS_REQUEST' } & QValue)
| ({ type: 'SAVE_TASKS_SUCCESS' } & QValue & S<{}>)
| ({ type: 'SAVE_TASKS_ERROR'   } & QValue & E)

| ({ type: 'LOAD_TASKS_REQUEST' } & QEmpty)
| ({ type: 'LOAD_TASKS_SUCCESS' } & QEmpty & S<{ value: string }>)
| ({ type: 'LOAD_TASKS_ERROR'   } & QEmpty & E)

export const addTask = (task: Store.Task): Action => ({
  type: 'ADD_TASK', task: task,
})

export const deleteTask = (id: number): Action => ({
  type: 'DELETE_TASK', id: id,
})

export const findTask = (value: string): Action => ({
  type: 'FIND_TASK', value: value,
})

export const completeTask = (id: number): Action => ({
  type: 'COMPLETE_TASK', id: id,
})

export const filterTasksByMonth = (month: number): Action => ({
  type: 'FILTER_TASKS_BY_MONTH', month: month,
})

export const editTask = (task: Store.Task): Action => ({
  type: 'EDIT_TASK', task: task,
})

export type ApiActionGroup<_Q, _S> = {
  request: (q?: _Q)         => Action & Q<_Q>
  success: (s: _S, q?: _Q)  => Action & Q<_Q> & S<_S>
  error: (e: Error, q?: _Q) => Action & Q<_Q> & E
}

export const saveTasks: ApiActionGroup<{ value: string }, {}> = {
  request: (request) =>
    ({ type: 'SAVE_TASKS_REQUEST', request }),
  success: (response, request) =>
    ({ type: 'SAVE_TASKS_SUCCESS', request, response }),
  error: (error, request) =>
    ({ type: 'SAVE_TASKS_ERROR',   request, error }),
}

export const loadTasks: ApiActionGroup<null, { value: string }> = {
  request: (request) =>
    ({ type: 'LOAD_TASKS_REQUEST', request: null }),
  success: (response, request) =>
    ({ type: 'LOAD_TASKS_SUCCESS', request: null, response }),
  error: (error, request) =>
    ({ type: 'LOAD_TASKS_ERROR',   request: null, error }),
}
