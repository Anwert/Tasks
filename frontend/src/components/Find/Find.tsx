import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll } from "../../interfaces";

interface IConnectedDispatch {
  findTask: (value: string) => void;
}

const mapStateToProps = (store: IStoreAll) => ({});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>): IConnectedDispatch => ({
  findTask: (value: string) => {
    dispatch(action.findTask(value));
  },
});

class FindComponent extends React.PureComponent<IConnectedDispatch> {

  private findTaskInput: HTMLInputElement;

  public render() {
    return (
      <div className="searchtask">
        <img
          src="../../assets/search.png"
          width="30"
          height="30"
          alt="search"
          className="searchtask__btn"
        />
        <input
          type="text"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="Search task..."
          className="searchtask__input"
        />
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
    this.props.findTask(event.target.value);
  }

  private handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  }
}

export const Find: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(FindComponent);
