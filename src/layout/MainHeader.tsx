import { useContext, useReducer } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/authContext";
import { authReducer, authInitialState } from "../store/authReducer";
import classes from "./MainNavigation.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <header>Options</header>
      <nav className={classes.nav}>
        <ul>
        <li>
            <NavLink activeClassName={classes.active} to="/requests">
              Requests
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/quotes">
              Quotes
            </NavLink>
          </li>
          {!authCtx.state.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}

          {authCtx.state.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/logout">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
