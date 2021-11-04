import classes from "./Requests.module.css";

import { useContext, useEffect, useReducer, useState } from "react";
import { formsReducer } from "../../store/formsReducer";
import HttpService from "../../http/http-service";

import Card from "../UI/Card";
import FormStatus from "../Common/FormStatus";
import SelectField from "./Fields/SelectField";
import WarningNo from "./Fields/WarningNo";

import { MarketCodeDef } from "../../models/MarketCodeDef";
import { SlctContext } from "../../store/slctContext";

const initialState = {
  marketCd:   { value: "", touched: false, hasError: true, error: "" },
  warningNo:  { value: "", touched: false, hasError: true, error: "" },
  mctnId:     { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const RequestsForm = () => {
  console.log("RequestsForm.init:");

  const [formStatus, setFormStatus] = useState({
    pending: false,
    errFlag: false,
    message: "",
  });
  const [formState, formDispatch] = useReducer(formsReducer, initialState);
  const slctCtx = useContext(SlctContext);

  useEffect(() => {
    setFormStatus({
      pending: true,
      errFlag: false,
      message: "Fetching market codes... ",
    });
    HttpService.getMarketCodes()
      .then((response) => {
        setFormStatus({
          pending: false,
          errFlag: false,
          message: "Fetch complete: " + response.data.length,
        });
        const tmpOpts = response.data.map((item: MarketCodeDef) => {
          return { key: item.marketCd, value: item.warningNo };
        });
        slctCtx.dispatch({ type: "LOAD_CODES", payload: { options: tmpOpts } });
      })
      .catch((error) => {
        setFormStatus({
          pending: false,
          errFlag: true,
          message: error.message,
        });
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const formSubmitHandler = (event: any) => {
    event.preventDefault(); //prevents the form from submitting
  };

  return (
    <Card>
      <div className={classes.Login}>
        <h1 className={classes.title}>Manage Requests</h1>
        <form onSubmit={(e) => formSubmitHandler(e)}>
          <div className={classes.input_wrapper}>
            <SelectField
              id={"marketCd"}
              dispName="Market Code:"
              formDispatch={formDispatch}
              formState={formState.marketCd}
            />
            <WarningNo
              id={"warningNo"}
              dispName="Warning No:"
              formDispatch={formDispatch}
              formState={formState.warningNo}
              disabled={true}
            />
        <div className={`${classes.break}`} />

        <FormStatus
          pending={formStatus.pending}
          errFlag={formStatus.errFlag}
          message={formStatus.message}
        />
            <div className={classes.input_wrapper}>
              <input
                className={classes.submit_btn}
                type="submit"
                value="Search"
                disabled={formStatus.pending}
              />
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default RequestsForm;
