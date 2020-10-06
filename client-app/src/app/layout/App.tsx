import React, { useEffect, Fragment, useContext } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //empty [] to run only once

  if (activityStore.loadingInitial) {
    return <LoadingComponent content={"Loading activities..."} />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
        {/* <Route exact path="/" component={HomePage} />
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} /> */}
      </Container>
    </Fragment>
  );
};

export default observer(App);
