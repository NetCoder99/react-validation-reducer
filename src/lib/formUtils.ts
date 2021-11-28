import { validateInput } from "./validateLoginFields";

export const UPDATE_FORM = "UPDATE_FORM";

export interface stateDef {
  name:     string;
  value:    string | boolean;
  touched:  boolean;
  hasError: boolean;
  error:    string;
  isFormValid: boolean;
}

export const onInputChange = (name:string, value:string, dispatch:React.Dispatch<any>, formState:stateDef[]) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    //console.log('onInputChange:' + key);
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }
  dispatch({type: UPDATE_FORM, data: { name, value, hasError, error, touched: false, isFormValid }});
};

export const onFocusOut = (name: string, value: string | boolean,dispatch: React.Dispatch<any>,formState: stateDef[]) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    //console.log('onFocusOut:' + key);
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

