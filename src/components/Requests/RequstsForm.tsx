import classes from "./LoginForm.module.css";

import { useReducer, useState } from "react";
import { formsReducer } from "../../store/formsReducer";
import HttpService from '../../http/http-service';

import Card from "../UI/Card";
import FormStatus from "../Common/FormStatus";
import InputField from "../Common/InputField";
import CheckBox from "../Common/CheckBox";
import { validateLoginForm } from "../../lib/validateLoginForm";

const initialState = {
  userId:   { value: "", touched: false, hasError: true, error: "" },
  name:     { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  terms:    { value: false, touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const RequestsForm = () => {
  console.log("RequestsForm.init:");

  const [formStatus, setFormStatus]  = useState({pending: false, errFlag: false, message: '' });
  const [formState,  formDispatch]   = useReducer(formsReducer, initialState);
  
  const formSubmitHandler = (event: any) => {
    event.preventDefault() //prevents the form from submitting
    const {isFormValid, errMessage } = validateLoginForm(formState, formDispatch);

    if (!isFormValid) {
      setFormStatus({pending: false, errFlag: true, message: errMessage})
    } else {
      setFormStatus({pending: true, errFlag: false, message: "Processing request..."})
      HttpService.getAllQuotes()
      .then(response => {
        const recCnt = response.data.length;
        setFormStatus({pending: false, errFlag: false, message: "Processing complete: " + recCnt})
        console.table(response.data);
      })
      .catch(error => {
        setFormStatus({pending: false, errFlag: true, message: error.message})
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
          <InputField id={"userId"}   dispName="User Id:"  formDispatch={formDispatch} formState={formState.userId} />
          <InputField id={"name"}     dispName="Name:"     formDispatch={formDispatch} formState={formState.name}   />
          <InputField id={"password"} dispName="Password:" formDispatch={formDispatch} formState={formState.password} type="password"/>
          <CheckBox   id={"terms"}    dispName="Accept terms and conditions" formDispatch={formDispatch} formState={formState.terms} />
          
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

export default RequestsForm;
