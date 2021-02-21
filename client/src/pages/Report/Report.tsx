import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import LocationPrice from "./subpage/LocationPrice";

const Report = () => {
  const [key, setKey] = useState("export");

  return (
    <>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
        >
          <Tab eventKey="export" title="Export">
            <h4 style={{marginTop: '15px'}}>Under Construction</h4>
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <LocationPrice/>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Report;
