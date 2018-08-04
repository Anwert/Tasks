import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";
import * as action from "../../actions";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { ListComponent } from "./ListComponent";
import { IConnectedDispatch, IConnectedStore, IOwnState } from "./ListInterfaces";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
  token: store.auth.token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ITask[], undefined, redux.AnyAction>): IConnectedDispatch => ({
  fetchTasks: (token: string) => dispatch(action.fetchTasks(token)),
});

class ListContainer extends React.PureComponent<IConnectedDispatch & IConnectedStore, IOwnState> {

  constructor(props: IConnectedDispatch & IConnectedStore) {
    super(props);
    this.state = {
      modalIsOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentWillMount() {
    this.props.fetchTasks(this.props.token);
  }

  public render() {
    return (
      <ListComponent
        token={this.props.token}
        modalIsOpened={this.state.modalIsOpened}
        openModal={this.openModal}
        closeModal={this.closeModal}
        tasks={this.props.tasks}
      />
    );
  }

  private openModal = function() {
    this.setState({modalIsOpened: true});
  };

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  };
}

export const List: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(ListContainer);
