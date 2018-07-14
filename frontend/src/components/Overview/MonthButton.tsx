import * as React from "react";
import { IMonthButtonProps } from "./OverviewInterfaces";

export const MonthButton = (props: IMonthButtonProps) => {
  const handleClick = () => {
    props.chooseMonth(props.monthNumber);
  };

  return (
    <button onClick={handleClick} className={`month__btn ${props.enabled(props.monthNumber)}`}>
      {props.monthName}
    </button>
  );
};
