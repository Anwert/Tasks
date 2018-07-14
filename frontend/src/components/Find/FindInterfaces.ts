import * as React from "react";

export interface IOwnProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IConnectedDispatch {
  findTask: (value: string) => void;
}
