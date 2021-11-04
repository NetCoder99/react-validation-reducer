import React from "react";
import { useReducer } from "react";
import { slctReducer } from "./slctReducer";


export interface SlctDefinition {
  options: { key: string, value: string}[],
  crntItem: {key: string, value: string}
  warningNo: string,
}

const slctInitState: SlctDefinition = {
  options: [{key: "", value: ""}, {key: "AZ", value: "8001"}, {key: "CA", value: "8002"}],
  crntItem: {key: "", value: ""},
  warningNo: "",
};

export const SlctContext = React.createContext<{
  state: SlctDefinition;
  dispatch: React.Dispatch<any>;
}>
(
  { state: slctInitState, dispatch: () => null }
);

const SlctProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(slctReducer, slctInitState);
  return (
    <SlctContext.Provider value={{ state, dispatch }}>
      {children}
    </SlctContext.Provider>
  );
};
export default SlctProvider;

