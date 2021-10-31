import { UPDATE_FORM } from "./formUtils";
import { validateInput } from "./validateLoginFields";

export const validateLoginForm = (
  formState: any,
  formDispatch: React.Dispatch<any>
) => {
  let isFormValid = true;
  let errMessage = "";
  for (const name in formState) {
    const item = formState[name];
    const { value } = item;
    const { hasError, error } = validateInput(name, value);
    if (hasError) {
      isFormValid = false;
      if (errMessage.trim() === "") {
        errMessage = error;
      }
    }
    if (name) {
      formDispatch({
        type: UPDATE_FORM,
        data: { name, value, hasError, error, touched: true, isFormValid },
      });
    }
  }
  return { isFormValid, errMessage };
};
