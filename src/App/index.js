import { Switch, Route } from "react-router-dom";

import PageSeasons from "../pages/Seasons";

import Layout from "../components/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <PageSeasons />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
