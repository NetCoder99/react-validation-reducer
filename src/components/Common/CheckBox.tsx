import { onFocusOut } from '../../lib/formUtils';
import classes from '../Login/LoginForm.module.css';

const CheckBox = (props: 
  { 
    id: string, 
    dispName: string,
    formDispatch: React.Dispatch<any>, 
    formState: any
    type?: string
    }) => 
  {
  console.log("CheckBox.init:");
  let tmpClass = '';
  if (props.formState.touched && props.formState.hasError) {
    tmpClass = classes.error;
  }
  return (
    <div className={classes.input_wrapper}>
    <label className={classes.toc}>
      <input
        type="checkbox"
        name={props.id}
        checked={props.formState.value}
        className={tmpClass}
        onChange={e => {
          onFocusOut(props.id, e.target.checked, props.formDispatch, props.formState)
        }}                
        />{" "}
      {props.dispName}
    </label>
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

export default CheckBox;