import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";
import * as action from "../../actions";
import { IStoreAll, ITask } from "../../reducers";
import { Menu } from "../Menu/Menu";
import { MenuButton } from "../Menu/MenuButton";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";

interface IOwnState {
    modalIsOpened: boolean;
    enabledMonth: number;
}

interface IConnectedStore {
  tasks: ITask[];
}

interface IConnectedDispatch {
  filterTasksByMonth: (month: number) => void;
}

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  tasks: store.tasks.filter((task) => task.date.getUTCMonth() === store.filterTasksByMonth),
});

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): IConnectedDispatch => ({
  filterTasksByMonth: (month: number) => {
    dispatch(action.filterTasksByMonth(month));
  },
});

class OverviewComponent extends React.PureComponent<IConnectedStore & IConnectedDispatch, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch) {
    super(props);
    this.state = {
      modalIsOpened: false,
      enabledMonth: new Date().getUTCMonth(),
    };
  }

  public render() {
    return (
      <div>
        <MenuButton />
        <div className="overview__label">Overview</div>
        <div className="statistics">
          <button onClick={this.chooseMonth.bind(this, 0)} className={`month__btn ${this.enabled(0)}`}>
            January
          </button>
          <button onClick={this.chooseMonth.bind(this, 1)} className={`month__btn ${this.enabled(1)}`}>
            February
          </button>
          <button onClick={this.chooseMonth.bind(this, 2)} className={`month__btn ${this.enabled(2)}`}>
            March
          </button>
          <button onClick={this.chooseMonth.bind(this, 3)} className={`month__btn ${this.enabled(3)}`}>
            April
          </button>
          <button onClick={this.chooseMonth.bind(this, 4)} className={`month__btn ${this.enabled(4)}`}>
            May
          </button>
          <button onClick={this.chooseMonth.bind(this, 5)} className={`month__btn ${this.enabled(5)}`}>
            June
          </button>
          <button onClick={this.chooseMonth.bind(this, 6)} className={`month__btn ${this.enabled(6)}`}>
            July
          </button>
          <button onClick={this.chooseMonth.bind(this, 7)} className={`month__btn ${this.enabled(7)}`}>
            August
          </button>
          <button onClick={this.chooseMonth.bind(this, 8)} className={`month__btn ${this.enabled(8)}`}>
            September
          </button>
          <button onClick={this.chooseMonth.bind(this, 9)} className={`month__btn ${this.enabled(9)}`}>
            October
          </button>
          <button onClick={this.chooseMonth.bind(this, 10)} className={`month__btn ${this.enabled(10)}`}>
            November
          </button>
          <button onClick={this.chooseMonth.bind(this, 11)} className={`month__btn ${this.enabled(11)}`}>
            December
          </button>
          <div className="statistics__text">
            <div className="statistics__text__total">{this.props.tasks.length}</div>
            <div className="statistics__text__total__label">Total</div>
            <div className="statistics__text__percents">
              Completed {this.showCompleted()}
            </div>
            <div className="statistics__text__percents">
              Overdue {this.showOverdue()}
            </div>
            <button onClick={this.openModal} className="add__button add__button__overview">+</button>
            <ModalAddOrEditTask
              isOpen={this.state.modalIsOpened}
              onRequestClose={this.closeModal}
              date={this.getDate()}
            />
          </div>
        </div>
      </div>
    );
  }

  private getDate = () => {
    const date = new Date();
    date.setMonth(this.state.enabledMonth);
    if (new Date().getUTCMonth() !== this.state.enabledMonth) {
      date.setDate(1);
    }
    return date;
  }

  private chooseMonth = (month: number) => {
    this.props.filterTasksByMonth(month);
    this.setState({
        enabledMonth: month,
      });
  }

  private showCompleted = () => {
    const allTasks = this.props.tasks.length;
    const completedTasks = this.props.tasks.filter((task) => task.completed === true).length;
    if (allTasks > 0) {
      return `${(completedTasks * 100 / allTasks).toFixed(1)}%`;
    }
    return `0%`;
  }

  private showOverdue = () => {
    const allTasks = this.props.tasks.length;
    const overdueTasks = this.props.tasks
      .filter((task) => task.completed === false)
      .filter((task) => task.date < new Date()).length;
    if (allTasks > 0) {
      return `${(overdueTasks * 100 / allTasks).toFixed(1)}%`;
    }
    return `0%`;
  }

  private openModal = () => {
    this.setState({
      modalIsOpened: true,
    });
  }

  private closeModal = () => {
    this.setState({
      modalIsOpened: false,
    });
  }

  private enabled = (month: number) => {
    if (month === this.state.enabledMonth) {
      return `month__btn--active`;
    }
    return ``;
  }
}

export const Overview: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(OverviewComponent);
