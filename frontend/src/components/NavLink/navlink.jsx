import React, { forwardRef } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import "./navlink.css";

const NavLink = forwardRef(
  ({ className = "", activeClassName = "", pendingClassName = "", to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          [
            className,
            isActive ? activeClassName : "",
            isPending ? pendingClassName : "",
          ].join(" ")
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;