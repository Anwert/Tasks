import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as redux from "redux";

export const Menu = () => {
  return (
    <div className="menu">
      <Link to="/" className="menu__el">
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
    </div>
  );
};
