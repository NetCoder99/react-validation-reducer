import classes from '../Login/LoginForm.module.css';

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const FormStatusAxios = (props: { loading: boolean; error: Error | undefined}) => {
  return (
    <>
      {props.loading   && <div className={classes.form_ok}>{}</div>}
      {!props.loading  && !props.error && 
        <div className={classes.form_ok}>{props.error}</div>
      }
      {!props.loading  && props.error && 
        <div className={classes.form_error}>{props.error}</div>
      }
    </>
  );
};

export default FormStatusAxios;
