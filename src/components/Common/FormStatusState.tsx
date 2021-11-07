import classes from '../Login/LoginForm.module.css';

const FormStatusState = (props: {fetching:boolean; errFlag:boolean; message:string}) => {
  console.log("FormStatusState", props);

  return (
    <>
      {props.fetching   && <div className={classes.form_ok}>{props.message}</div>}
      {!props.fetching  && !props.errFlag && 
        <div className={classes.form_ok}>{props.message}</div>
      }
      {!props.fetching  && props.errFlag && 
        <div className={classes.form_error}>{props.message}</div>
      }
    </>
  );
};

export default FormStatusState;
