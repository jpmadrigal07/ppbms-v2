import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faClipboardList,
  faUser,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.scss";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Container className="ContentTopMargin">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faFileImport} /> Imported Lists
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                1.4K
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faClipboardList} /> Lists Data
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                2M
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faUser} /> Dispatch Control
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                1.4K
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faCheckCircle} /> Lists Completed
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                1M
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
