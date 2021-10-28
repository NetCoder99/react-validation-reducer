import classes from "./LoginForm.module.css";

import { useReducer, useState } from "react";
import { onFocusOut, onInputChange, UPDATE_FORM } from "../../lib/formUtils";
import { validateInput } from "../../lib/validateLogin";
import { formsReducer } from "../../store/formsReducer";
import HttpService from '../../http/http-service';

import Card from "../UI/Card";


const initialState = {
  name: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  terms: { value: false, touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const LoginForm = () => {
  console.log("LoginForm.init:");

  const [showError, setShowError] = useState({errFlag: false, message: '' });
  const [apiStatus, setApiStatus] = useState({pending: false});
  const [formState, formDispatch] = useReducer(formsReducer, initialState);
  //console.table({ "name state": formState.name });
  
  const formSubmitHandler = (event: any) => {
    event.preventDefault() //prevents the form from submitting

    let isFormValid = true;
    let errMessage = '';

    for (const name in formState) {
      const item = formState[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value)
      if (hasError) {
        isFormValid = false;
        if (errMessage.trim() === '') {
          errMessage = error;
        };
      }
      if (name) {
        formDispatch({type: UPDATE_FORM, data: {name,value,hasError,error,touched:true,isFormValid}})
      }
    }

    if (!isFormValid) {
      setShowError({errFlag: true, message: errMessage})
    } else {
      setShowError({errFlag: false, message: 'Processing api request'})
      setApiStatus({pending: true});
      HttpService.getAllQuotes()
      .then(response => {
        const recCnt = response.data.length;
        setShowError({errFlag: false, message: "Processing complete: " + recCnt})
        setApiStatus({pending: false});
        console.table(response.data);
      })
      .catch(error => {
        setShowError({errFlag: true, message: error.message})
        setApiStatus({pending: false});
        console.log(error);
      });
    }
  }

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>Sign Up</h1>

        {!(showError.errFlag) && 
          <div className={classes.form_ok}>{showError.message}</div>
        }

        {(showError.errFlag) && 
          <div className={classes.form_error}>{showError.message}</div>
        }
        
        <form onSubmit={e => formSubmitHandler(e)}>
          <div className={classes.input_wrapper}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name.value}
              className={formState.name.touched && formState.name.hasError && classes.error}
              onChange={(e) => {
                onInputChange("name", e.target.value, formDispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("name", e.target.value, formDispatch, formState);
              }}
            />
            <div className={classes.break} />
            {!(formState.name.touched && formState.name.hasError) && (
              <div className={classes.error}>&nbsp;</div>
            )}            
            {formState.name.touched && formState.name.hasError && (
              <div className={classes.error}>{formState.name.error}</div>
            )}
          </div>

          <div className={classes.input_wrapper}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formState.password.value}
              className={formState.password.touched && formState.password.hasError && classes.error}
              onChange={(e) => {
                onInputChange("password", e.target.value, formDispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("password", e.target.value, formDispatch, formState);
              }}
            />
            <div className={classes.break} />
            {!(formState.password.touched && formState.password.hasError) && (
              <div className={classes.error}>&nbsp;</div>
            )}            
            {formState.password.touched && formState.password.hasError && (
              <div className={classes.error}>{formState.password.error}</div>
            )}

          </div>

          <div className={classes.input_wrapper}>
            <label className={classes.toc}>
              <input
                type="checkbox"
                name="terms"
                checked={formState.terms.value}
                className={formState.terms.touched && formState.terms.hasError && classes.error}
                onChange={e => {
                  onFocusOut("terms", e.target.checked, formDispatch, formState)
                }}                
                />{" "}
              Accept terms and conditions
            </label>
            <div className={classes.break} />
            {!(formState.terms.touched && formState.terms.hasError) && (
              <div className={classes.error}>&nbsp;</div>
            )}            
            {formState.terms.touched && formState.terms.hasError && (
              <div className={classes.error}>{formState.terms.error}</div>
            )}            
          </div>

          <div className={classes.input_wrapper}>
            <input
              className={classes.submit_btn}
              type="submit"
              value="Sign Up"
              disabled={apiStatus.pending}
            />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
