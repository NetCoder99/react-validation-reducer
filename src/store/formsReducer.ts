import { UPDATE_FORM, onInputChange } from '../lib/formUtils';

export interface Payload {
  type: string,
  data: {
    name:     string,
    value:    string | boolean,
    hasError: boolean,
    error:    string,
    touched:  boolean,
    isFormValid: boolean,
  }
};

export const formsReducer = (state: any, action: Payload) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } = action.data
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      }

    default:
      return state
  }

}