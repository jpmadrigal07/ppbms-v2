import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import AddMessenger from "./subpage/AddMessenger";
import MessengerListView from "./subpage/MessengerListView";

const DispatchControl = () => {
  const [key, setKey] = useState("lists");

  return (
    <>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
        >
          <Tab eventKey="lists" title="Lists">
            <MessengerListView currentTab={key} />
          </Tab>
          <Tab eventKey="addMessenger" title="Add Messenger">
            <AddMessenger />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default DispatchControl;

