import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../../actions";
import * as redux from "redux";
import { IAction, IStoreAll, ITask } from "../../interfaces";
import { Menu } from "../Menu/Menu";
import { MenuButton } from "../Menu/MenuButton";
import { ModalAddOrEditTask } from "../ModalAddOrEditTask/ModalAddOrEditTask";

interface IOwnState {
    modalIsOpened: boolean;
}

interface IConnectedStore {
  tasks: ITask[];
  enabledMonth: number;
}

interface IConnectedDispatch {
  filterTasksByMonth: (month: number) => void;
}

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  tasks: store.tasks.filter((task) => task.date.getUTCMonth() === store.filterTasksByMonth),
  enabledMonth: store.filterTasksByMonth,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<IAction>): IConnectedDispatch => ({
  filterTasksByMonth: (month: number) => {
    dispatch(action.filterTasksByMonth(month));
  },
});

class OverviewComponent extends React.PureComponent<IConnectedStore & IConnectedDispatch, IOwnState> {

  constructor(props: IConnectedStore & IConnectedDispatch) {
    super(props);
    this.state = {
      modalIsOpened: false,
    };
    this.getDate = this.getDate.bind(this);
    this.showOverdue = this.showOverdue.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.enabled = this.enabled.bind(this);
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

  private getDate = function() {
    const date = new Date();
    date.setUTCMonth(this.props.enabledMonth);
    if (new Date().getUTCMonth() !== this.props.enabledMonth) {
      date.setUTCDate(1);
    }
    return date;
  }

  private chooseMonth = function(month: number) {
    this.props.filterTasksByMonth(month);
  }

  private showCompleted = function() {
    const allTasks = this.props.tasks.length;
    const completedTasks = this.props.tasks.filter((task: ITask) => task.completed === true).length;
    if (allTasks > 0) {
      return `${(completedTasks * 100 / allTasks).toFixed(1)}%`;
    }
    return `0%`;
  }

  private showOverdue = function() {
    const allTasks = this.props.tasks.length;
    const overdueTasks = this.props.tasks
      .filter((task: ITask) => task.completed === false)
      .filter((task: ITask) => task.date < new Date()).length;
    if (allTasks > 0) {
      return `${(overdueTasks * 100 / allTasks).toFixed(1)}%`;
    }
    return `0%`;
  }

  private openModal = function() {
    this.setState({
      modalIsOpened: true,
    });
  }

  private closeModal = function() {
    this.setState({
      modalIsOpened: false,
    });
  }

  private enabled = function(month: number) {
    if (month === this.props.enabledMonth) {
      return `month__btn--active`;
    }
    return ``;
  }
}

export const Overview: React.ComponentClass =
  connect(mapStateToProps, mapDispatchToProps)(OverviewComponent);
