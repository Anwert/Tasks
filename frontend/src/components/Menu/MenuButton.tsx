import * as React from "react";
import { Link } from "react-router-dom";

export const MenuButton = () => (
  <Link to="/menu">
    <i className="fa fa-bars" aria-hidden="true" />
  </Link>
);
