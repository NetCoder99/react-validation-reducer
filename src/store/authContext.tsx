import React, { useReducer } from "react";
import { authReducer } from "./authReducer";

export interface AuthDefinition {
  isLoggedIn: boolean;
  apiToken: string;
  userRoles: string[];
}

const authInitState: AuthDefinition = {
  isLoggedIn: false,
  apiToken: "",
  userRoles: Array<string>(),
};

export const AuthContext = React.createContext<{
  state: AuthDefinition;
  dispatch: React.Dispatch<any>;
}>({ state: authInitState, dispatch: () => null });

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
