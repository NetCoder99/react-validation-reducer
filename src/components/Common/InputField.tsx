import { onFocusOut, onInputChange } from '../../lib/formUtils';
import { formFieldDef } from '../../store/fieldReducer';
//import classes from '../Login/LoginForm.module.css';

const InputField = (props: 
  { 
    id: string, 
    dispName: string,
    fieldDispatch: React.Dispatch<any>, 
    fieldState: formFieldDef,
    type?: string
    showMsg?: boolean
    disabled?: boolean
    inpWidth?: string
    classes: {
      readonly [key: string]: string;
    }  
    }) => 
  {

  let content = <div>&nbsp;</div>;
  if (props.fieldState.touched && props.fieldState.hasError) {
    content = <div className={props.classes.error}>{props.fieldState.hasError}</div>
  };

  let tmpClass = '';
  if (props.fieldState.touched && props.fieldState.hasError) {
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
      value={props.fieldState.value}
      className={tmpClass && props.inpWidth}
      disabled={props.disabled}
      onChange={(e) => {
        onInputChange(props.id, e.target.value, props.fieldDispatch, props.fieldState);
      }}
      onBlur={(e) => {
        onFocusOut(props.id, e.target.value, props.fieldDispatch, props.fieldState);
      }}
    />
    <div className={props.classes.break} />
    {props.showMsg && content} 
  </div>
  );
};

export default InputField;