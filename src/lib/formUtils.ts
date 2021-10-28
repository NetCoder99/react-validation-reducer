import { validateInput } from "./validateLogin";

export const UPDATE_FORM = "UPDATE_FORM";
/** * Triggered every time the value of the form changes */

// export interface fieldDef {
//   name:     string;
//   value:    string | boolean;
//   touched:  boolean;
//   hasError: boolean;
//   error:    string;
// }

// const initialState = {
//   name: { value: "", touched: false, hasError: true, error: "" },
//   //email: { value: "", touched: false, hasError: true, error: "" },
//   password: { value: "", touched: false, hasError: true, error: "" },
//   //mobile: { value: "", touched: false, hasError: true, error: "" },
//   terms: { value: false, touched: false, hasError: true, error: "" },
//   isFormValid: false,
// };


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
    console.log('onInputChange:' + key);
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


export const onFocusOut = (name: string,value: string | boolean,dispatch: React.Dispatch<any>,formState: stateDef[]) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    console.log('onFocusOut:' + key);
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

// export function getFirstError(formState: stateDef[]) : string {
//   for (const key in formState) {
//     console.log('getFirstError:' + key);
//     const item = formState[key];
//     if (item.hasError) {
//       return item.error;
//     }  
//   }
//   return '';
// }