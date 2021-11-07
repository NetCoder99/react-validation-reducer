import { MarketCodeDef } from "../models/MarketCodeDef";

export type slctAction = 
  { type: "LOAD_MARKET_CODES";  payload: {mktCodes: MarketCodeDef[]}}   
| { type: "LOAD_ITEMS";    payload: {options: {key: string,value: string}[] }} 
| { type: "SET_ITEM";      payload: {item: {key: string, value: string}}}   

export const slctReducer = (state: any, action: slctAction) => {
  switch (action.type) {
    case "LOAD_MARKET_CODES":
      console.log('slctReducer.LOAD_MARKET_CODES');
      const tmpItems = action.payload.mktCodes.map((item) => {return {key: item.marketCd, value: item.warningNo}});
      return {...state, options: tmpItems}
     
    case "LOAD_ITEMS":
      console.log('slctReducer.LOAD_ITEMS');
      return {...action.payload, crntItem: {key: "", value: ""} }

    case "SET_ITEM":
      console.log('slctReducer.SET_ITEM');
      return {...state, crntItem: {key: action.payload.item.key, value: action.payload.item.value} }
  
    default:
      return state
  }

}