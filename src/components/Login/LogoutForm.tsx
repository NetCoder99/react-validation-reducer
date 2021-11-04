import classes from "./LoginForm.module.css";

import { useContext, useEffect } from "react";

import Card from "../UI/Card";
import { AuthContext } from "../../store/authContext";
import { LOGOUT } from "../../store/authReducer";

const LogoutForm = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.dispatch({type: LOGOUT})
    // eslint-disable-next-line    
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
