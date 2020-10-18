import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import React, { useEffect, Fragment, useContext } from "react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from    "../../../app/stores/rootStore"; 


const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;
   
  useEffect(() => {
    loadActivities();
  }, [loadActivities]); //empty [] to run only once and if not initialized it will run indefinitely

  if (loadingInitial) {
    return <LoadingComponent content={"Loading activities..."} />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Actitvity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
