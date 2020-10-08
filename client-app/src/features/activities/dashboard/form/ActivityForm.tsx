import React, { FormEvent, useState, useContext, useEffect } from "react";
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);

  const {
    activity: initialFormState,
    createActivity,
    editActivity,
    submitting,
    cancelFormOPen,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    date: "",
    category: "",
    venue: "",
    city: "",
  });
  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };
  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name="venue"
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              floated="right"
              positive
              content="Submit"
              type="submit"
              loading={submitting}
            />
            <Button
              floated="right"
              content="Cancel"
              type="button"
              onClick={cancelFormOPen}
            />
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityForm);
