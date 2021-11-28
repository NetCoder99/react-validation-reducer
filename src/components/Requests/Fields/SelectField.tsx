import React, { useContext } from "react";
import { onFocusOut, onInputChange } from '../../../lib/formUtils';
import { SlctContext } from "../../../store/slctContext";
import classes from "../Requests.module.css";

export interface selectProps {
  id:           string;
  dispName:     string;
  formDispatch: React.Dispatch<any>;
  formState:    any;
  type?:        string;
  showMsg?:     boolean;
  inpClass?:    string
}
const SelectField = (props: selectProps) => {

  const slctCtx = useContext(SlctContext);
  let tmpOptions = slctCtx.state.options.map((item: {key: string,value: string}) => <option key={item.key} value={item.value}>{item.key}</option>)

  let tmpClass = props.inpClass || '';
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = classes.error;
  }

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = <div className={classes.error}>{props.formState.error}</div>;
  }

  function slctChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    onInputChange(props.id, event.target.value, props.formDispatch, props.formState);
    const key = event.target.options[event.target.selectedIndex].text;
    slctCtx.dispatch({ type: "SET_ITEM", payload: { item: {key: key, value: event.target.value} } })
  };

  return (
    <div className={classes.input_wrapper}>
      <label htmlFor={props.id}>{props.dispName}</label>
      <br />

      <select
        value={props.formState.value}
        className={tmpClass}
        onChange={slctChangeHandler}
        onBlur={(e) => {
          onFocusOut(props.id,e.target.value,props.formDispatch,props.formState);
        }}
      >
        <option value=""></option>
        {tmpOptions}
      </select>
    </div>
  );
};

export default SelectField;
