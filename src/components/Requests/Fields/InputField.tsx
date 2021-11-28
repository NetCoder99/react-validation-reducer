import { onFocusOut, onInputChange } from '../../../lib/formUtils';
import classes from '../Requests.module.css';

interface inpProps {
  id: string, 
  dispName: string,
  formDispatch: React.Dispatch<any>, 
  formState : any
  type?     : string
  showMsg?  : boolean
  disabled? : boolean
  inpClass  : string
  classes   : { readonly [key: string]: string; } 
}

const InputField = (props: inpProps) => {
  console.log("InputField.init");

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = <div className={props.classes.error}>{props.formState.error}</div>
  };

  let tmpClass = '';
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = props.classes.error;
  }

  return (
    <div className={`${classes.input_wrapper}`}>
    <label htmlFor={props.id}>{props.dispName}</label>
    <br />
    <input
      type={props.type || "text"}
      name={props.id}
      id={props.id}
      value={props.formState.value}
      className={props.inpClass}
      disabled={props.disabled}
      onChange={(e) => {
        onInputChange(props.id, e.target.value, props.formDispatch, props.formState);
      }}
      onBlur={(e) => {
        onFocusOut(props.id, e.target.value, props.formDispatch, props.formState);
      }}
    />
  </div>
  );
};

export default InputField;