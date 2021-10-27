import { useReducer, useState } from "react";
import { onFocusOut, onInputChange, UPDATE_FORM, validateInput } from "../../lib/formUtils";
import { formsReducer } from "../../store/formsReducer";
import Card from "../UI/Card";
import classes from "./LoginForm.module.css";

const initialState = {
  name: { value: "", touched: false, hasError: true, error: "" },
  email: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  mobile: { value: "", touched: false, hasError: true, error: "" },
  terms: { value: false, touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const LoginForm = () => {
  console.log("LoginForm.init:");

  const [showError, setShowError] = useState(false)
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  console.table({ "name state": formState.name });
  

  const formSubmitHandler = (event: any) => {
    event.preventDefault() //prevents the form from submitting

    let isFormValid = true
    for (const name in formState) {
      const item = formState[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value)
      if (hasError) {
        isFormValid = false
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {name,value,hasError,error,touched:true,isFormValid}
        })
      }
    }
    if (!isFormValid) {
      setShowError(true)
    } else {
    }

    setTimeout(() => {
      setShowError(false)
    }, 5000)
  }

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>Sign Up</h1>
        {showError && !formState.isFormValid && (
          <div className={classes.form_error}>Please fill all the fields correctly</div>
        )}
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
                onInputChange("name", e.target.value, dispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("name", e.target.value, dispatch, formState);
              }}
            />
            {formState.name.touched && formState.name.hasError && (
              <div className={classes.error}>{formState.name.error}</div>
            )}
          </div>

          <div className={classes.input_wrapper}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email.value}
              className={formState.email.touched && formState.email.hasError && classes.error}
              onChange={(e) => {
                onInputChange("email", e.target.value, dispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("email", e.target.value, dispatch, formState);
              }}
            />
            {formState.email.touched && formState.email.hasError && (
              <div className={classes.error}>{formState.email.error}</div>
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
                onInputChange("password", e.target.value, dispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("password", e.target.value, dispatch, formState);
              }}
            />
            {formState.password.touched && formState.password.hasError && (
              <div className={classes.error}>{formState.password.error}</div>
            )}

          </div>

          <div className={classes.input_wrapper}>
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              checked={formState.mobile.value}
              className={formState.mobile.touched && formState.mobile.hasError && classes.error}
              onChange={(e) => {
                onInputChange("mobile", e.target.value, dispatch, formState);
              }}
              onBlur={(e) => {
                onFocusOut("mobile", e.target.value, dispatch, formState);
              }}
            />
            {formState.mobile.touched && formState.mobile.hasError && (
              <div className={classes.error}>{formState.mobile.error}</div>
            )}
          </div>

          <div className={classes.input_wrapper}>
            <label className="toc">
              <input
                type="checkbox"
                name="terms"
                checked={formState.terms.value}
                className={formState.terms.touched && formState.terms.hasError && classes.error}
                onChange={e => {
                  onFocusOut("terms", e.target.checked, dispatch, formState)
                }}                
                />{" "}
              Accept terms and conditions
            </label>
            {formState.terms.touched && formState.terms.hasError && (
              <div className={classes.error}>{formState.terms.error}</div>
            )}            
          </div>

          <div className={classes.input_wrapper}>
            <input
              className={classes.submit_btn}
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
