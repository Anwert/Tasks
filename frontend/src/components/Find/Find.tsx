import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import * as action from "../../actions";
import { IStoreAll } from "../../reducers";

interface IConnectedDispatch {
  findTask: (value: string) => void;
}

const mapStateToProps = (store: IStoreAll) => ({});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): IConnectedDispatch => ({
  findTask: (value: string) => {
    dispatch(action.findTask(value));
  },
});

class FindComponent extends React.Component<IConnectedDispatch> {

  private findTaskInput: HTMLInputElement;

  public render() {
    return (
      <div className="searchtask">
        <input type="text" ref={(input) => {this.findTaskInput = input; }} className="searchtask__input"/>
        <img
          onClick={this.onFindTask}
          src="../../assets/search.png"
          width="30"
          height="30"
          alt="search"
          className="searchtask__btn"
        />
      </div>
    );
  }

  private onFindTask = () => {
    this.props.findTask(this.findTaskInput.value);
  }
}

export const Find: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(FindComponent);
