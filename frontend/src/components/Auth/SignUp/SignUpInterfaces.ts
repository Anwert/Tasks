import * as React from "react";

import { IUser, IAuth } from "../../../interfaces";

export interface IComponentProps {
  auth: IAuth;
  hideErrors: () => void;
  emailError: boolean;
  passwordEmpty: boolean;
  passwordsError: boolean;
  handleSignUp: (event: React.SyntheticEvent) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePasswordConfirmation: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IConnectedDispatch {
  signupUser: (user: IUser) => void;
  signoutUser: () => void;
}

export interface IConnectedStore {
  auth: IAuth;
}

export interface IOwnState {
  redirectToSignIn: boolean;
  emailError: boolean;
  passwordEmpty: boolean;
  passwordsError: boolean;
  emailInput: string;
  passwordInput: string;
  passwordConfirmationInput: string;
}
