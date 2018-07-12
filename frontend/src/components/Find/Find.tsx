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
          placeholder="Search task..."
          className="searchtask__input"
        />
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
    this.props.findTask(event.target.value)
  }
}

export const Find: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(FindComponent);
