import { IAction, IAuth } from "../interfaces";

export default function auth(state: IAuth = {error: "", token: "", registrated: false}, action: IAction): IAuth {
  switch (action.type) {
    case "AUTH_USER":
      return {error: "", token: action.token, registrated: false};
    case "UNAUTH_USER":
      return {error: "", token: "", registrated: false};
    case "AUTH_ERROR":
      return {error: action.payload, token: "", registrated: false};
    case "SIGNUP_COMPLETED":
      return {error: "", token: "", registrated: true};
  }
  return state;
}
