import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import AddMessenger from "./subpage/AddMessenger";

const DispatchControl = () => {
  const [key, setKey] = useState("lists");

  // FIX when importing new masterlist on masterlists, on the view tab, you cannot see the encode list real time

  // Investigate all functions on all fixed pages and fix all for smooth ux

  return (
    <>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
        >
          <Tab eventKey="lists" title="Lists">
            <h4 style={{marginTop: '15px'}}>Under Construction</h4>
          </Tab>
          <Tab eventKey="addMessenger" title="Add Messenger">
            <AddMessenger/>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default DispatchControl;

