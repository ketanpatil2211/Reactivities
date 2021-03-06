import { observer } from "mobx-react-lite";
import React,{useContext} from "react";
import { Button, Item, Segment, Image, Header } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
import {Link} from 'react-router-dom';
import { RootStoreContext } from "../../../../app/stores/rootStore";
const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore=useContext(RootStoreContext);
const {attendActivity,cancelAttendance,loading}=rootStore.activityStore;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
               <p> {activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
       {activity.isHost? (
          <Button 
          color="orange" 
          floated="right"
           as={Link} to={`/manage/${activity.id}`}
           >
            Manage Event
          </Button>
       ):activity.isGoing?(
            <Button onClick={cancelAttendance} loading={loading}>Cancel attendance</Button> 
       ):(
            <Button onClick={attendActivity} color="teal" loading={loading}>Join Activity</Button>
       )}
      </Segment>
    </Segment.Group>
  );
};
export default observer(ActivityDetailedHeader);
