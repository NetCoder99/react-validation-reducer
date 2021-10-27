export const UPDATE_FORM = "UPDATE_FORM";
/** * Triggered every time the value of the form changes */

export interface stateDef {
  name: string;
  value: string | boolean;
  touched: boolean;
  hasError: boolean;
  error: string;
  isFormValid: boolean;
}

export const onInputChange = (
  name: string,
  value: string,
  dispatch: React.Dispatch<any>,
  formState: stateDef[]
) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }
  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const onFocusOut = (
  name: string,
  value: string | boolean,
  dispatch: React.Dispatch<any>,
  formState: stateDef[]
) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }
  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

export const validateInput = (name: string, value: string|boolean) => {
  let hasError = false,error = "";

  let tmpValue: string = '';
  if(typeof value === 'boolean') {
    tmpValue = value? "true":"false";
  }
  else {
    tmpValue = value;
  }

  switch (name) {

    case "name":
      if (tmpValue.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(tmpValue)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "email":
      if (tmpValue.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          tmpValue
        )
      ) {
        hasError = true;
        error = "Invalid Email";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "password":
      if (tmpValue.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (tmpValue.trim().length < 8) {
        hasError = true;
        error = "Password must have at least 8 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "mobile":
      if (tmpValue.trim() === "") {
        hasError = true;
        error = "Mobile cannot be empty";
      } else if (!/^[0-9]{10}$/.test(tmpValue)) {
        hasError = true;
        error = "Invalid Mobile Number. Use 10 digits only";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "terms":
      if (!value) {
        hasError = true;
        error = "You must accept terms and conditions";
      } else {
        hasError = false;
        error = "";
      }
      break;

    default:
      break;
  }
  return { hasError, error };
};
