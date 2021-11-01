import { onFocusOut, onInputChange } from '../../lib/formUtils';
import classes from '../Login/LoginForm.module.css';

const InputField = (props: 
  { 
    id: string, 
    dispName: string,
    formDispatch: React.Dispatch<any>, 
    formState: any
    type?: string
    showMsg?: boolean
    }) => 
  {

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = <div className={classes.error}>{props.formState.error}</div>
  };

  let tmpClass = '';
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = classes.error;
  }


  return (
    <div className={classes.input_wrapper}>
    <label htmlFor={props.id}>{props.dispName}</label>
    <input
      type={props.type || "text"}
      name={props.id}
      id={props.id}
      value={props.formState.value}
      className={tmpClass}
      onChange={(e) => {
        onInputChange(props.id, e.target.value, props.formDispatch, props.formState);
      }}
      onBlur={(e) => {
        onFocusOut(props.id, e.target.value, props.formDispatch, props.formState);
      }}
    />
    <div className={classes.break} />
    {props.showMsg && content} 
  </div>
  );
};

export default InputField;