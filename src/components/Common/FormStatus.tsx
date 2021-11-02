import classes from '../Login/LoginForm.module.css';

const FormStatus = (props: { pending: boolean; errFlag: boolean; message: string }) => {
  return (
    <>
      {props.pending   && <div className={classes.form_ok}>{props.message}</div>}
      {!props.pending  && !props.errFlag && 
        <div className={classes.form_ok}>{props.message}</div>
      }
      {!props.pending  && props.errFlag && 
        <div className={classes.form_error}>{props.message}</div>
      }
    </>
  );
};

export default FormStatus;
