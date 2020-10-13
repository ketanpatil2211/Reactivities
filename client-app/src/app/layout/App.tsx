import React, { Fragment } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/details/ActivityDetails";
import { NotFound } from "./NotFound";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
                key={location.key}
              />
              <Route  component={NotFound}/>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
