import { IAuth, IUser } from "../../../interfaces";

export interface IComponentProps {
  auth: IAuth;
  hideErrors: () => void;
  handleSignIn: (event: React.SyntheticEvent) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface IConnectedDispatch {
  signinUser: (user: IUser) => void;
  signoutUser: () => void;
}

export interface IConnectedStore {
  auth: IAuth;
}

export interface IOwnState {
  emailInput: string;
  passwordInput: string;
}
