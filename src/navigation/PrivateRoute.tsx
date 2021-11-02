import { useContext } from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { AuthContext } from "../store/authContext";

const PrivateRoute = (props: any) => {
    const location = useLocation();
    const AuthCtx  = useContext(AuthContext);
  
    return AuthCtx.state.isLoggedIn ? (
      <Route {...props} />
    ) : (
      <Redirect to={{pathname: "/login", state: { from: location } }} />
    );
  };

  export default PrivateRoute;