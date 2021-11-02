import { Route, Switch } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import LogoutForm from "../components/Login/LogoutForm";
import QuoteList from "../components/QuotesList/QuoteList";
import RequestsForm from "../components/Requests/RequestsForm";
import PrivateRoute from "./PrivateRoute";


export default function AppRoutes() {
  console.log("AppRoutes");

  const routeArray = [
    <Route key="requests" path="/requests" component={RequestsForm}  />,
    <PrivateRoute key="quotes"   path="/quotes"   component={QuoteList}  />,
    <Route key="login"    path="/login"    component={LoginForm}  />,
    <PrivateRoute key="logout"   path="/logout"   component={LogoutForm} />
  ];

  return (
      <Switch>
        {routeArray}
      </Switch>
  );

}