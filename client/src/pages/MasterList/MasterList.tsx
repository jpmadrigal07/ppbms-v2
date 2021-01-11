import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import MasterListSettings from "./subpage/MasterListSettings";
import Import from "../../components/Import/Import";

const MasterList = () => {
  const [key, setKey] = useState("view");

  return (
    <>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
        >
          <Tab eventKey="view" title="View">
            <h4>asdasd</h4>
          </Tab>
          <Tab eventKey="import" title="Import">
            <Import useBy={"masterlists"} />
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <MasterListSettings/>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default MasterList;

