import * as React from "react";
import { ITask } from "../../interfaces";
import { Find } from "../Find/FindContainer";
import { MenuButton } from "../Menu/MenuButton";
import { Modal } from "../Modal/ModalContainer";
import { MonthButton } from "./MonthButton";
import { IComponentProps } from "./OverviewInterfaces";
import { Redirect } from "react-router-dom";

const renderCompleted = (tasks: ITask[]) => {
  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task: ITask) => task.completed === true).length;
  if (allTasks > 0) {
    return `${(completedTasks * 100 / allTasks).toFixed(1)}%`;
  }
  return `0%`;
};

const renderOverdue = (tasks: ITask[]) => {
  const allTasks = tasks.length;
  const overdueTasks = tasks
    .filter((task: ITask) => task.completed === false)
    .filter((task: ITask) => task.date < new Date()).length;
  if (allTasks > 0) {
    return `${(overdueTasks * 100 / allTasks).toFixed(1)}%`;
  }
  return `0%`;
};

export const OverviewComponent = (props: IComponentProps) => {
  const isAuthorized = () => {
    if (!props.token) return (
      <Redirect from="/overview" to="/signin" />
    )
  }

  return (
    <div>
      {isAuthorized()}
      <MenuButton />
      <div className="overview__label">Overview</div>
      <div className="statistics">
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={0}
          monthName={"January"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={1}
          monthName={"February"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={2}
          monthName={"March"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={3}
          monthName={"April"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={4}
          monthName={"May"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={5}
          monthName={"June"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={6}
          monthName={"July"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={7}
          monthName={"August"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={8}
          monthName={"September"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={9}
          monthName={"October"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={10}
          monthName={"November"}
        />
        <MonthButton
          chooseMonth={props.chooseMonth}
          enabled={props.enabled}
          monthNumber={11}
          monthName={"December"}
        />
        <div className="statistics__text">
          <div className="statistics__text__total">{props.tasks.length}</div>
          <div className="statistics__text__total__label">Total</div>
          <div className="statistics__text__percents">
            Completed {renderCompleted(props.tasks)}
          </div>
          <div className="statistics__text__percents">
            Overdue {renderOverdue(props.tasks)}
          </div>
          <button onClick={props.openModal} className="add__button add__button__overview">+</button>
          <Modal
            isOpen={props.modalIsOpened}
            onRequestClose={props.closeModal}
            date={props.getDate()}
          />
        </div>
      </div>
    </div>
  )
};
