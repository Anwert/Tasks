import { IUser, IAuth } from "../../../interfaces";

export interface IComponentProps {
  handleSignUp: (email: string, password: string, passwordConfirmation: string) => void;
  auth: IAuth;
  error: boolean;
}

export interface IConnectedDispatch {
  signupUser: (user: IUser) => void;
}

export interface IConnectedStore {
  auth: IAuth;
}

export interface IOwnState {
  error: boolean;
  redirectToSignIn: boolean;
}