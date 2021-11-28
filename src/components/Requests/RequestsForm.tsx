import classes from "./Requests.module.css";
import { useContext, useEffect, useReducer } from "react";
import { formsReducer } from "../../store/formsReducer";

import Card from "../UI/Card";
import SelectField from "./Fields/SelectField";
import WarningNo from "./Fields/WarningNo";

import { MktCdContext } from "../../store/mktCdContext";
import { SlctContext } from "../../store/slctContext";
import HttpService from "../../http/http-service";
import FormStatusState from "../Common/FormStatusState";
import InputField from "./Fields/InputField";

const initialState = {
  marketCd: { value: "", touched: false, hasError: true, error: "" },
  warningNo: { value: "", touched: false, hasError: true, error: "" },
  mctnId: { value: "", touched: false, hasError: true, error: "" },
  npiId: { value: "", touched: false, hasError: true, error: "" },
  prprId: { value: "", touched: false, hasError: true, error: "" },
  prprName: { value: "", touched: false, hasError: true, error: "" },
  effDate: { value: "", touched: false, hasError: true, error: "" },
  termDate: { value: "", touched: false, hasError: true, error: "" },

  isFormValid: false,
};

const RequestsForm = () => {
  console.log("RequestsForm.init:");
  const [formState, formDispatch] = useReducer(formsReducer, initialState);
  const mktCdCtx = useContext(MktCdContext);
  const slctCtx = useContext(SlctContext);

  useEffect(() => {
    mktCdCtx.dispatch({ type: "FETCHING" });
    HttpService.getMarketCodes()
      .then((response) => {
        mktCdCtx.dispatch({type: "COMPLETE",payload: { mktCodes: response.data }});
        slctCtx.dispatch({type: "LOAD_MARKET_CODES", payload: { mktCodes: response.data }});
      })
      .catch((error) => {
        mktCdCtx.dispatch({ type: "HAD_ERROR", payload: { error } });
      });
  }, []);

  const formSubmitHandler = (event: any) => {
    event.preventDefault(); //prevents the form from submitting
  };

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>Manage Requests</h1>
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className={classes.input_container}>
            <SelectField
              id={"marketCd"}
              dispName="Mrkt Code:"
              formDispatch={formDispatch}
              formState={formState.marketCd}
              inpClass={classes.width_5rem}
            />
            <WarningNo
              id={"warningNo"}
              dispName="Warning No:"
              formDispatch={formDispatch}
              formState={formState.warningNo}
              disabled={true}
            />
            <InputField
              id={"mctnId"}
              dispName="Mctn Id:"
              formDispatch={formDispatch}
              formState={formState.mctnId}
              inpClass={classes.width_7rem}
              classes={classes}
            />
            <InputField
              id={"npiId"}
              dispName="Npi Id:"
              formDispatch={formDispatch}
              formState={formState.npiId}
              inpClass={classes.width_7rem}
              classes={classes}
            />
            <InputField
              id={"prprId"}
              dispName="Prpr Id:"
              formDispatch={formDispatch}
              formState={formState.prprId}
              inpClass={classes.width_8rem}
              classes={classes}
            />


            <div className={`${classes.break}`} />
            <br />
            <InputField
              id={"prprName"}
              dispName="Npi Id:"
              formDispatch={formDispatch}
              formState={formState.npiId}
              inpClass={classes.width_7rem}
              classes={classes}
            />
            <InputField
              id={"prprId"}
              dispName="Prpr Id:"
              formDispatch={formDispatch}
              formState={formState.prprId}
              inpClass={classes.width_8rem}
              classes={classes}
            />

            <div className={`${classes.break}`} />
            <br />

            <div className={classes.input_wrapper}>
              <input
                className={classes.submit_btn}
                type="submit"
                value="Search"
                disabled={mktCdCtx.state.fetchState.fetching}
              />
            </div>
            <FormStatusState {...mktCdCtx.state.fetchState} />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default RequestsForm;
