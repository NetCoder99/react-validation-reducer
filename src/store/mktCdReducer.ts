import { getErrorMessage } from "../lib/apiErrorMessage";
import { MarketCodeDef } from "../models/MarketCodeDef";
import { MarketCodeStateDef } from "./mktCdContext";

export type mktCdAction = 
  { type: "FETCHING",   payload: {} } 
| { type: "COMPLETE",   payload: {mktCodes: MarketCodeDef[]} } 
| { type: "HAD_ERROR",  payload: {error: any} } 

export const mktCdReducer = (state: MarketCodeStateDef, action: mktCdAction) => {
  let newState: MarketCodeStateDef = {
    fetchState: {
      fetching : false,
      errFlag  : false,
      message  : ""
    },
    mktCodes: []
  }
  switch (action.type) {
    case "FETCHING":
      console.log('mktCdReducer.FETCHING');
      newState.fetchState.fetching = true;
      newState.fetchState.errFlag = false;
      newState.fetchState.message = "Fetching market codes...";
      return {...newState };

    case "COMPLETE":
        console.log('mktCdReducer.COMPLETE');
        newState.fetchState.fetching= false;
        newState.fetchState.errFlag = false;
        newState.fetchState.message = "Fetching complete";
        newState.mktCodes = action.payload.mktCodes;
        return {...newState,  };
  
    case "HAD_ERROR":
      console.log('mktCdReducer.HAD_ERROR');
      newState.fetchState.fetching= false;
      newState.fetchState.errFlag = true;
      const errMessage = getErrorMessage(action.payload.error);
      newState.fetchState.message = errMessage;
      return {...newState,  };

    default:
      return state;

  }

}