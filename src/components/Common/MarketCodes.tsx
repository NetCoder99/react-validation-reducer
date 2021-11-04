import { useContext } from "react";
import { onFocusOut, onInputChange } from "../../lib/formUtils";
import { SlctContext } from "../../store/slctContext";
//import classes from "../Login/LoginForm.module.css";

export interface selectProps {
  id: string;
  dispName: string;
  formDispatch: React.Dispatch<any>;
  formState: any;
  type?: string;
  showMsg?: boolean;

  classes: {
    readonly [key: string]: string;
  };
}
const MarketCodes = (props: selectProps) => {
  const slctCtx = useContext(SlctContext);
  let tmpOptions = slctCtx.state.options.map(
    (item: { key: string; value: string }) => (
      <option key={item.key} value={item.value}>
        {item.key}
      </option>
    )
  );

  let tmpClass = "";
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = props.classes.error;
  }

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = (
      <div className={props.classes.error}>{props.formState.error}</div>
    );
  }
  return (
    <div className={`${props.classes.input_wrapper} ${props.classes.flexChild}`}    >
      <label htmlFor={props.id} className={`${'width5rem'}`} >{props.dispName}</label>
      <div className={`${props.classes.break}`} />
      <select
        value={props.formState.value}
        className={tmpClass}
        onChange={(e) => {
          onInputChange(
            props.id,
            e.target.value,
            props.formDispatch,
            props.formState
          );
        }}
        onBlur={(e) => {
          onFocusOut(
            props.id,
            e.target.value,
            props.formDispatch,
            props.formState
          );
        }}
      >
        <option value="Select an option"></option>
        {tmpOptions}
      </select>
      <div className={props.classes.break} />
      {props.showMsg && content}
    </div>
  );
};

export default MarketCodes;
