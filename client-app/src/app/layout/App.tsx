import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); //[state,function to set state] use state has default type for state:never
  const [SelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter((x) => x.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const hanldeCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const hanldeEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((x) => x.id !== activity.id),
      activity,
    ]);
    setEditMode(false);
    setSelectedActivity(activity);
  };
  const handleDeleteACtivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((x) => {
          x.date = x.date.split(".")[0];
          activities.push(x);
        });
        setActivities(activities);
      });
  }, []); //empty [] to run only once
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          selectActivity={handleSelectedActivity}
          selectedActivity={SelectedActivity}
          activities={activities}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={hanldeCreateActivity}
          editActivity={hanldeEditActivity}
          deleteActivity={handleDeleteACtivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
