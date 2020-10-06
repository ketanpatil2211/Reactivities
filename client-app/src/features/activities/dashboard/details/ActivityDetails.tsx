import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ActivityStore from "../../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity,
    openEditForm,
    cancelSelectedactivity,
  } = activityStore;
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {selectedActivity === null ? "No content" : selectedActivity!.title}
        </Card.Header>
        <Card.Meta>
          <span>{selectedActivity!.date}</span>{" "}
        </Card.Meta>
        <Card.Description>{selectedActivity!.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openEditForm(selectedActivity!.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectedactivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);
