import { Route, Switch } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import QuoteList from "../components/QuotesList/QuoteList";


export default function AppRoutes() {
  console.log("AppRoutes");

  const routeArray = [
    <Route key="quotes" path="/quotes"   component={QuoteList} />,
    <Route key="login"  path="/login"    component={LoginForm} />
  ];

  return (
      <Switch>
        {routeArray}
      </Switch>
  );

}