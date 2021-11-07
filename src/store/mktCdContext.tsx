import React, { useReducer } from "react";
import { MarketCodeDef } from "../models/MarketCodeDef";
import { mktCdReducer } from "./mktCdReducer";

export interface MarketCodeStateDef {
  fetchState: 
  {  
    fetching : boolean,
    errFlag  : boolean,
    message  : string
  },
  mktCodes: MarketCodeDef[]
}

export const mktCdInitState:MarketCodeStateDef = {
  fetchState: 
  {  
    fetching : false,
    errFlag  : false,
    message  : ""
  },
  mktCodes: Array<MarketCodeDef>()
}

export const MktCdContext = React.createContext<{state: MarketCodeStateDef;dispatch: React.Dispatch<any>}>
(
  { state: mktCdInitState, dispatch: () => null }
);

export const MktCdProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mktCdReducer, mktCdInitState);
  return (
    <MktCdContext.Provider value={{ state, dispatch }}>
      {children}
    </MktCdContext.Provider>
  );
};


