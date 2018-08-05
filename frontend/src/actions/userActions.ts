import axios from "axios";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { IAction, IAuth, IUser } from "../interfaces";

// authentication
export const signinUser: ActionCreator<ThunkAction<void, undefined, undefined, IAction>> = (user: IUser) => {
  return function(dispatch: Dispatch<IAction>) {
    // submit email and password to server
    const request = axios.post(`http://localhost:3200/signin`, user);
    request
      .then((response) => {
        // -if request is good, we need to update state to indicate user is authenticated and save the token
        dispatch({type: "AUTH_USER", token: response.data.token});
      })
      .catch(() => {
        // If request is bad...
        // -Show an error to the user
        dispatch(authError("bad login info"));
      });
  };
};

export function signoutUser(): IAction {
  return {
    type: "UNAUTH_USER",
  };
}

export const signupUser: ActionCreator<ThunkAction<void, undefined, undefined, IAction>> = (user: IUser) => {
  return function(dispatch: Dispatch<IAction>) {
    axios.post(`http://localhost:3200/signup`, user)
      .then((response) => {
        dispatch({type: "SIGNUP_COMPLETED"});
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error));
      });
  };
};

export const authError = (error: string): IAction => {
  return {
    type: "AUTH_ERROR",
    payload: error,
  };
};
