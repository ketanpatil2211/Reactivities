import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreateForm } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item>Activities</Menu.Item>
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={openCreateForm}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default observer(NavBar);
