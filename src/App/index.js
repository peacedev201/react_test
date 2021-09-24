import { Switch, Route } from "react-router-dom";

import PageSeasons from "../pages/Seasons";

import Layout from "../components/Layout";
import DriverInfo from "../pages/DriverInfo";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <PageSeasons />
        </Route>
        <Route path="/driver/:id" exact>
          <DriverInfo />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
