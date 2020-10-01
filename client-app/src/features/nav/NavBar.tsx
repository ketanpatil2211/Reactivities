import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Iprops {
  openCreateForm: () => void;
}

export const NavBar: React.FC<Iprops> = ({ openCreateForm }) => {
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
            onClick={() => openCreateForm()}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
