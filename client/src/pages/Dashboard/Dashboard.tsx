import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faClipboardList,
  faUser,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.scss";
import "./Dashboard.scss";
import { getDashboardCount } from "../../actions/dashboardCountActions";
import { getEncodeList } from "../../actions/encodeListActions";
import { getRecord } from "../../actions/recordActions";
import { getDispatchControlMessengers } from "../../actions/dispatchControlMessengerActions";
import { I_DashboardProps, I_GlobalState } from "../../interfaces";
import _ from "lodash";

const Dashboard = (props: I_DashboardProps) => {
  const {
    getDashboardCount,
    gAuthData,
    importedListCount,
    isImportedListLoading,
    listDataCount,
    isListDataLoading,
    dispatchControlCount,
    isDispatchControlLoading,
    listCompletedCount,
    isListCompletedLoading,
  } = props;

  useEffect(() => {
    if (gAuthData && gAuthData !== "" && !_.isNil(gAuthData.role)) {
      if (importedListCount === 0) {
        getDashboardCount("importedList");
      }
      if (listDataCount === 0) {
        getDashboardCount("listData");
      }
      if (dispatchControlCount === 0) {
        getDashboardCount("dispatchControl");
      }
      if (listCompletedCount === 0) {
        getDashboardCount("listCompleted");
      }
    }
  }, [
    dispatchControlCount,
    gAuthData,
    getDashboardCount,
    importedListCount,
    listCompletedCount,
    listDataCount,
  ]);

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
                {!isImportedListLoading ? (
                  formatCash(importedListCount)
                ) : (
                  <Spinner animation="grow" />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">
              <FontAwesomeIcon icon={faClipboardList} /> List Data
            </Card.Header>
            <Card.Body>
              <Card.Text className="DataText">
                {!isListDataLoading ? (
                  formatCash(listDataCount)
                ) : (
                  <Spinner animation="grow" />
                )}
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
                {!isDispatchControlLoading ? (
                  formatCash(dispatchControlCount)
                ) : (
                  <Spinner animation="grow" />
                )}
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
                {!isListCompletedLoading ? (
                  formatCash(listCompletedCount)
                ) : (
                  <Spinner animation="grow" />
                )}
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
  recordData: gState.record.data,
  importedListCount: gState.dashboardCount.importedList,
  isImportedListLoading: gState.dashboardCount.isImportedListLoading,
  listDataCount: gState.dashboardCount.listData,
  isListDataLoading: gState.dashboardCount.isListDataLoading,
  dispatchControlCount: gState.dashboardCount.dispatchControl,
  isDispatchControlLoading: gState.dashboardCount.isDispatchControlLoading,
  listCompletedCount: gState.dashboardCount.listCompleted,
  isListCompletedLoading: gState.dashboardCount.isListCompletedLoading,
});

export default connect(mapStateToProps, {
  getDashboardCount,
  getEncodeList,
  getRecord,
  getDispatchControlMessengers,
})(Dashboard);
