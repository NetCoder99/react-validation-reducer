import { useContext } from "react";
import { SlctContext } from "../../../store/slctContext";
import classes from "../Requests.module.css";

export interface warningNoProps {
  id: string, 
  dispName: string,
  formDispatch: React.Dispatch<any>, 
  formState: any
  type?: string
  showMsg?: boolean
  disabled?: boolean
}

const WarningNo = (props: warningNoProps) => {
  const slctCtx = useContext(SlctContext);

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = <div className={classes.error}>{props.formState.error}</div>
  };

  return (
    <div className={`${classes.input_wrapper} ${classes.flexChild}`}>
    <label htmlFor={props.id}>{props.dispName}</label>
    <div className={`${classes.break}`} />
    <input
      type={props.type || "text"}
      name={props.id}
      id={props.id}
      value={slctCtx.state.crntItem.value}
      className={'width5rem'}
      disabled={props.disabled}
    />
    <div className={classes.break} />
    {props.showMsg && content} 
  </div>
  );
};

export default WarningNo;