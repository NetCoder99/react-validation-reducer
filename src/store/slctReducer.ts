export type slctAction = 
  { type: "LOAD_CODES";    payload: {options: {key: string,value: string}[] }} 
| { type: "SET_ITEM";      payload: {item: {key: string, value: string}}}   

export const slctReducer = (state: any, action: slctAction) => {
  switch (action.type) {
    case "LOAD_CODES":
      console.log('slctReducer.LOAD_CODES');
      return {...action.payload, crntItem: {key: "", value: ""} }

    case "SET_ITEM":
      console.log('slctReducer.SET_ITEM');
      return {...state, crntItem: {key: action.payload.item.key, value: action.payload.item.value} }
  
    default:
      return state
  }

}