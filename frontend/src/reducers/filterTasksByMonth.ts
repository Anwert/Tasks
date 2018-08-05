import { IAction } from "../interfaces";

export default function filterTasksByMonth(state: number = new Date().getUTCMonth(), action: IAction): number {
  if (action.type === "FILTER_TASKS_BY_MONTH") {
    return action.month;
  }
  return state;
}
