export const UPDATE_FIELD = "UPDATE_FIELD";

export interface formFieldDef {
  id       : string,
  value    : string | number | boolean;
  touched  : boolean;
  hasError : boolean;
  errorMsg : string;
}

export interface Payload {
  type: string,
  data: formFieldDef
};

export const onFieldChange = (name:string, value:string|boolean|number , dispatch:React.Dispatch<any>) => {
  const tmp: formFieldDef = {id: name, value: value, touched: true, hasError: false, errorMsg: ""  };
  dispatch({type: UPDATE_FIELD, data: tmp});
};


export const fieldsReducer = (state: any, action: Payload) => {
  switch (action.type) {
    case UPDATE_FIELD:
      const { id, value, touched,  hasError, errorMsg } = action.data
      return {
        ...state,
        [id]: { ...state[id], value, touched, hasError, errorMsg },
      }

    default:
      return state
  }

}