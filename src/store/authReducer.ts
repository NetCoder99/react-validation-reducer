import { setApiToken } from "../lib/sessionStorage";
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AuthDefinition } from "./authContext";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const authInitialState:AuthDefinition = {
  isLoggedIn: false,
  apiToken  : "",
  userRoles : Array<string>(),
};

export interface AuthPayload {
  isLoggedIn: boolean,
  apiToken  : string,
  userRoles : string[],
}

type AuthAction = 
{ type: "LOGOUT" } |
{ type: "LOGIN"; payload: AuthPayload };

export const authReducer = (state: any, action: AuthAction) => {
  switch (action.type) {
    case LOGIN:
      let decodedToken = jwtDecode<JwtPayload>(action.payload.apiToken);
      console.log('decodedToken', decodedToken);

      var obj:AuthPayload = {
        isLoggedIn: true,
        apiToken  : action.payload.apiToken, 
        userRoles : action.payload.userRoles,
      };
      setApiToken(JSON.stringify(obj));
      return {...obj};

    case LOGOUT:
      // eslint-disable-next-line    
      var obj:AuthPayload = {
        isLoggedIn: false,
        apiToken  : '',
        userRoles : Array<string>(),
      };
      setApiToken(JSON.stringify(obj));
      return {...obj};

    default:
      return state;
  }
};
