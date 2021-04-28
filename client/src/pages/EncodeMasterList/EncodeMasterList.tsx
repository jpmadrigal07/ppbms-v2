import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Import from "../../components/Import/Import";

const EncodeMasterList = () => {
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
            <h4 style={{marginTop: '15px'}}>Under Construction</h4>
          </Tab>
          <Tab eventKey="import" title="Import">
            <Import useBy={"encodemasterlists"} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default EncodeMasterList;

