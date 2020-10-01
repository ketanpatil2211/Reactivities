import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "./details/ActivityDetails";
import { ActivityForm } from "./form/ActivityForm";
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void; //function signature
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (SelectedActivity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  targetButton: string;
}

export const ActivityDashboard: React.FC<IProps> = (props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={props.activities}
          selectActivity={props.selectActivity}
          deleteActivity={props.deleteActivity}
          targetButton={props.targetButton}
          submitting={props.submitting}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.selectedActivity && !props.editMode && (
          <ActivityDetails
            selectedActivity={props.selectedActivity}
            setEditMode={props.setEditMode}
            setSelectedActivity={props.setSelectedActivity}
          />
        )}
        {props.editMode && (
          <ActivityForm
            key={(props.selectedActivity && props.selectedActivity.id) || 0} //did not understand this(if 0 sets state of activity form to null otherwise to selectedActivity)
            setEditMode={props.setEditMode}
            selectedActivity={props.selectedActivity!}
            createActivity={props.createActivity}
            editActivity={props.editActivity}
            submitting={props.submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
