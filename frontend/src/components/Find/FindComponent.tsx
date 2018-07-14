import * as React from "react";
import { IComponentProps } from "./FindInterfaces";

const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.target.select();
};

export const FindComponent = (props: IComponentProps) => (
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
      onChange={props.handleChange}
      onFocus={handleFocus}
      placeholder="Search task..."
      className="searchtask__input"
    />
  </div>
);
