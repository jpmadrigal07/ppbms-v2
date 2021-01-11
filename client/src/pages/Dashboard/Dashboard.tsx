import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
import {
  getEncodeList
} from "../../actions/encodeListActions";
import {
  getRecord
} from "../../actions/recordActions";
import {
  getDispatchControlMessengers
} from "../../actions/dispatchControlMessengerActions";
import { I_DashboardProps, I_GlobalState } from "../../interfaces";
import _ from "lodash";

const Dashboard = (props: I_DashboardProps) => {
  const {
    getEncodeList,
    getRecord,
    getDispatchControlMessengers,
    gAuthData,
    dispatchControlMessengerData,
    encodeListData,
    recordData
  } = props;

  const [importedListCount, setImportedListCount] = useState(0); 
  const [listsDataCount, setListsDataCount] = useState(0); 
  const [dispatchControlCount, setDispatchControlCount] = useState(0); 
  const [listCompletedCount, setListCompletedCount] = useState(0); 

  useEffect(() => {
    if(gAuthData && gAuthData !== "") {
      getEncodeList();
      getRecord();
      getDispatchControlMessengers();
    }
  }, [gAuthData]);

  useEffect(() => {
    const data = dispatchControlMessengerData.filter(data => _.isNil(data.deletedAt));
    setDispatchControlCount(data.length)
  }, [dispatchControlMessengerData]);

  useEffect(() => {
    const data = encodeListData.filter(data => _.isNil(data.deletedAt));
    setImportedListCount(data.length)
  }, [encodeListData]);

  useEffect(() => {
    const listData = recordData.filter(data => _.isNil(data.deletedAt));
    setListsDataCount(listData.length)
    const listCompleted = recordData.filter(data => _.isNil(data.deletedAt));
    setListCompletedCount(listCompleted.length)
  }, [recordData]);

  const formatCash = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faFileImport} /> Imported Lists
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                {formatCash(importedListCount)}
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
                {formatCash(listsDataCount)}
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
                {formatCash(dispatchControlCount)}
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
                {formatCash(listCompletedCount)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gAuthData: gState.auth.user,
  dispatchControlMessengerData: gState.dispatchControlMessenger.data,
  encodeListData: gState.encodeList.data,
  recordData: gState.record.data
});

export default connect(mapStateToProps, {
  getEncodeList,
  getRecord,
  getDispatchControlMessengers
})(Dashboard);
