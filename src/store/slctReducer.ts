export type slctAction = 
  { type: "LOAD_CODES";    payload: {options: {key: string,value: string}[] }} 
| { type: "SET_ITEM";      payload: {item: {key: string, value: string}}}   

export const slctReducer = (state: any, action: slctAction) => {
  switch (action.type) {
    case "LOAD_CODES":
      console.log("slctReducer.SET_CODES", action.payload);
      console.log("slctReducer.SET_CODES", state);
      return {
         ...action.payload, 
         crntItem: {key: "", value: ""},
         warningNo: ""
      }

    case "SET_ITEM":
      console.log("slctReducer.SET_ITEM", action.payload);
      console.log("slctReducer.SET_ITEM", state);
      return {
        ...state, 
        crntItem: {key: action.payload.item.key, value: action.payload.item.value},
        warningNo: action.payload.item.key
      }
  
    default:
      return state
  }

}