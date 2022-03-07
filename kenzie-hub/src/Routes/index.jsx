import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Singup";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
  </Switch>
);

export default Routes;
