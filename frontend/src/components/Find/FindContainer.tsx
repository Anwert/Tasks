import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll } from "../../interfaces";
import { FindComponent } from "./FindComponent";
import { IConnectedDispatch } from "./FindInterfaces";

const mapStateToProps = (store: IStoreAll) => ({});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>): IConnectedDispatch => ({
  findTask: (value: string) => {
    dispatch(action.findTask(value));
  },
});

class FindContainer extends React.PureComponent<IConnectedDispatch> {

  private findTaskInput: HTMLInputElement;

  public render() {
    return (
      <FindComponent
        handleChange={this.handleChange}
      />
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
    this.props.findTask(event.target.value);
  }
}

export const Find: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(FindContainer);
