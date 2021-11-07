import { onFocusOut, onInputChange } from '../../../lib/formUtils';

import classes from '../Login/LoginForm.module.css';

const InputField = (props: 
  { 
    id: string, 
    dispName: string,
    formDispatch: React.Dispatch<any>, 
    formState: any
    type?: string
    showMsg?: boolean
    disabled?: boolean
    inpClass: string
    classes: {
      readonly [key: string]: string;
    }  
    }) => 
  {

  let content = <div>&nbsp;</div>;
  if (props.formState.touched && props.formState.hasError) {
    content = <div className={props.classes.error}>{props.formState.error}</div>
  };

  let tmpClass = '';
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = props.classes.error;
  }

  return (
    <div className={`${props.classes.input_wrapper} ${props.classes.flexChild}`}>
    <label htmlFor={props.id}>{props.dispName}</label>
    <br />
    <input
      type={props.type || "text"}
      name={props.id}
      id={props.id}
      value={props.formState.value}
      className={tmpClass && props.inpClass}
      disabled={props.disabled}
      onChange={(e) => {
        onInputChange(props.id, e.target.value, props.formDispatch, props.formState);
      }}
      onBlur={(e) => {
        onFocusOut(props.id, e.target.value, props.formDispatch, props.formState);
      }}
    />
    <div className={props.classes.break} />
    {props.showMsg && content} 
  </div>
  );
};

export default InputField;