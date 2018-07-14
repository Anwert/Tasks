import * as React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { IOwnState, IConnectedStore } from "./ListInterfaces";
import { ListComponent } from "./ListComponent"

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  tasks: store.tasks.filter((task) => task.value.includes(store.filterTasks)),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>) => ({});

class ListContainer extends React.PureComponent<IConnectedStore, IOwnState> {

  constructor(props: IConnectedStore) {
    super(props);
    this.state = {
      modalIsOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public render() {
    return (
      <ListComponent
        modalIsOpened={this.state.modalIsOpened}
        openModal={this.openModal}
        closeModal={this.closeModal}
        tasks={this.props.tasks}
      />
    );
  }

  private openModal = function() {
    this.setState({modalIsOpened: true});
  }

  private closeModal = function() {
    this.setState({modalIsOpened: false});
  }
}

export const List: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(ListContainer);
