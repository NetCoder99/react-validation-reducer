import classes from "./LoginForm.module.css";

import { useReducer, useState } from "react";
import HttpService from '../../http/http-service';

import Card from "../UI/Card";
import FormStatus from "../Common/FormStatus";
import InputField from "../Common/InputField";
import { validateLoginForm } from "../../lib/validateLoginForm";
import { fieldsReducer, formFieldDef } from "../../store/fieldReducer";

const userIdFld: formFieldDef = {id:"userId", value: "",  touched: false,  hasError: true,  errorMsg: ""}
const passWdFld: formFieldDef = {id:"passWd", value: "",  touched: false,  hasError: true,  errorMsg: ""}
const formFields = {
  userId: userIdFld,
  passWd: passWdFld,
};

const LoginForm = () => {
  console.log("LoginForm.init:");

  const [formStatus,   setFormStatus]  = useState({pending: false, errFlag: false, message: '' });
  const [fieldsState,  fieldsDispatch] = useReducer(fieldsReducer, formFields);
  
  const formSubmitHandler = (event: any) => {
    event.preventDefault() 
    const {isFormValid, errMessage } = validateLoginForm(fieldsState, fieldsDispatch);

    if (!isFormValid) {
      setFormStatus({pending: false, errFlag: true, message: errMessage})
    } else {
      setFormStatus({pending: true, errFlag: false, message: "Processing request..."})
      HttpService.login(fieldsState.userId.value, fieldsState.password.value)
       .then(response => {
         setFormStatus({pending: false, errFlag: false, message: "Login succeeded!"})
       })
       .catch(error => {
         setFormStatus({pending: false, errFlag: true, message: "Login succeeded!"})
         console.log(error);
       });
    }
  }

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>Sign Up</h1>
        <FormStatus pending={formStatus.pending} errFlag={formStatus.errFlag} message={formStatus.message} />
        <form onSubmit={e => formSubmitHandler(e)}>
          <InputField id={"userId"}   dispName="User Id:"  fieldDispatch={fieldsDispatch} fieldState={fieldsState.userId} classes={classes}/>
          <InputField id={"password"} dispName="Password:" fieldDispatch={fieldsDispatch} fieldState={fieldsState.password} type="password" classes={classes}/>
          
          <div className={classes.input_wrapper}>
            <input
              className={classes.submit_btn}
              type="submit"
              value="Sign Up"
              disabled={formStatus.pending}
            />
          </div>
        
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
