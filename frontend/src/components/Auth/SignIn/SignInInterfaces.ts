import { IAuth, IUser } from "../../../interfaces";

export interface IComponentProps {
  handleSignIn: (email: string, password: string) => void;
  auth: IAuth;
}

export interface IConnectedDispatch {
  signinUser: (user: IUser) => void;
  signoutUser: () => void;
}

export interface IConnectedStore {
  auth: IAuth;
}
