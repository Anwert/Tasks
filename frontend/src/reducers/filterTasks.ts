import { IAction } from "../interfaces";

export default function filterTasks(state: string = "", action: IAction): string {
  if (action.type === "FIND_TASK") {
    return action.value;
  }
  return state;
}
