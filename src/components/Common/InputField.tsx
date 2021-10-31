import { onFocusOut, onInputChange } from '../../lib/formUtils';
import classes from '../Login/LoginForm.module.css';


const InputField = (props: 
  { 
    id: string, 
    dispName: string,
    formDispatch: React.Dispatch<any>, 
    formState: any
    type?: string
    }) => 
  {
  console.log("InputField.init:");
  return (
    <div className={classes.input_wrapper}>
    <label htmlFor={props.id}>{props.dispName}</label>
    <input
      type={props.type || "text"}
      name={props.id}
      id={props.id}
      value={props.formState.value}
      className={props.formState.touched && props.formState.hasError && classes.error}
      onChange={(e) => {
        onInputChange(props.id, e.target.value, props.formDispatch, props.formState);
      }}
      onBlur={(e) => {
        onFocusOut(props.id, e.target.value, props.formDispatch, props.formState);
      }}
    />
    <div className={classes.break} />
    {!(props.formState.touched && props.formState.hasError) && (
      <div className={classes.error}>&nbsp;</div>
    )}            
    {props.formState.touched && props.formState.hasError && (
      <div className={classes.error}>{props.formState.error}</div>
    )}
  </div>
  );
};

export default InputField;