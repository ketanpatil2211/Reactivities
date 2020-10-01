import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
interface IProps {
  selectedActivity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (SelectedActivity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = ({
  selectedActivity,
  setEditMode,
  setSelectedActivity,
}) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {selectedActivity === null ? "No content" : selectedActivity.title}
        </Card.Header>
        <Card.Meta>{/* <span>{selectedActivity.date}</span> */}</Card.Meta>
        {/* <Card.Description>{selectedActivity.description}</Card.Description> */}
      </Card.Content>
      <Card.Content>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => setSelectedActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
