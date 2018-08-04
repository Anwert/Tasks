import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";
import { Redirect } from "react-router-dom";
import { IComponentProps } from "./MenuInterfaces";

export const MenuComponent = (props: IComponentProps) => {

  const isAuthorized = () => {
    if (!props.token) return (
      <Redirect from="/menu" to="/signin" />
    )
  }

  return (
    <div className="menu">
      {isAuthorized()}
      <Link to="/home" className="menu__el">
        <i className="fa fa-home fa-fw" aria-hidden="true"/>
        Home
      </Link>
      <Link to="/calendar" className="menu__el">
        <i className="fa fa-calendar-o" aria-hidden="true"/>
        Calendar
      </Link>
      <Link to="/overview" className="menu__el">
        <i className="fa fa-adjust" aria-hidden="true"/>
        Overview
      </Link>
      <Link to="/list" className="menu__el">
        <i className="fa fa-list" aria-hidden="true"/>
        List
      </Link>
      <Link to="/logout" className="menu__el">
        <i className="fa fa-list" aria-hidden="true"/>
        Logout
      </Link>
    </div>
  );
};
