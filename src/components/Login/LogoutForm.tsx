import classes from "./LoginForm.module.css";

import { useContext, useEffect, useReducer, useState } from "react";
import { formsReducer } from "../../store/formsReducer";
import HttpService from '../../http/http-service';

import Card from "../UI/Card";
import { AuthContext } from "../../store/authContext";
import { LOGOUT } from "../../store/authReducer";

const LogoutForm = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.dispatch({type: LOGOUT})
  }, [])  

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>You have been logged out</h1>
      </div>
    </Card>
  );
};

export default LogoutForm;
